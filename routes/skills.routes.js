const express = require('express');
const Skill = require('../models/skill.model');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  const skills = await Skill.find();
  res.send(skills);
});

router.get('/:id', auth, async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.send(skill);
});

router.post('/', auth, async (req, res) => {
  const newSkill = new Skill(req.body);
  const postSkill = await newSkill.save();
  res.send(postSkill);
});

router.put('/:id', auth, async (req, res) => {
  const putSkill = await Skill.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.send(putSkill);
});

router.delete('/:id', auth, async (req, res) => {
  const deleteSkill = await Skill.findByIdAndRemove(req.params.id);
  res.send(deleteSkill);
});

module.exports = router;
