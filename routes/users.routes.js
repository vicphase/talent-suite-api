var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  const postUser = await newUser.save();
  res.send(postUser);
});

router.put('/:id', async (req, res) => {
  const putUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.send(putUser);
});

router.delete('/:id', async (req, res) => {
  const deleteUser = await User.findByIdAndRemove(req.params.id);
  res.send(deleteUser);
});

module.exports = router;
