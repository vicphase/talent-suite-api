var express = require('express');
var router = express.Router();
var Skill = require('../models/skill.model');

router.get('/', async (req, res) => {
  const skills = await Skill.find();
  res.send(skills);
});

router.get('/:id', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.send(skill);
});

router.post('/', async (req, res) => {
  const newSkill = new Skill(req.body);
  const postSkill = await newSkill.save();
  res.send(postSkill);
});

router.put('/:id', async (req, res) => {
  const putSkill = await Skill.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.send(putSkill);
});

router.delete('/:id', async (req, res) => {
  const deleteSkill = await Skill.findByIdAndRemove(req.params.id);
  res.send(deleteSkill);
});

module.exports = router;
