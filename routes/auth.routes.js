const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { User } = require('../models/user.model');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('Invalid email or password.');
  }

  user = new User(req.body);

  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email', 'skills']));
});

function validate(user) {
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
}

module.exports = router;
