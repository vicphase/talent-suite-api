const bcrypt = require('bcrypt');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { userRoles } = require('../models/user.model');
const { User, validate } = require('../models/user.model');

const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
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
  res
    .header('access-token', token)
    .send(_.pick(user, ['_id', 'name', 'email', 'skills']));
});

module.exports = router;
