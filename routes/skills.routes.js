const express = require('express');
const { Skill, validate } = require('../models/skill.model');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const skills = await Skill.find();
  res.send(skills);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.send(skill);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const skill = new Skill(req.body);
  await skill.save();
  res.send(skill);
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
