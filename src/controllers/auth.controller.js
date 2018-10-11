const { User, validate } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { userRoles } = require('../models/user.model');
const passport = require('passport');
const Joi = require('joi');

const validateSignIn = user => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(user, schema);
};

module.exports = () => {
  const signUp = async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('User already registered.');
    }
    user = new User({ ...req.body, role: userRoles.prospect });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.send({ user, token });
  };

  const signIn = async (req, res) => {
    const { error } = validateSignIn(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    passport.authenticate('local', { session: false }, async (err, user) => {
      if (err || !user) {
        return res.status(400).send('Invalid email or password');
      }
      const token = user.generateAuthToken();
      res.send({ user, token });
    })(req, res);
  };

  return {
    signUp: signUp,
    signIn: signIn
  };
};
