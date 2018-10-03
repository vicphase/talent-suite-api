const express = require('express');
const Skill = require('../models/skill.model');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/async');

const router = express.Router();

router.get(
  '/',
  auth,
  asyncMiddleware(async (req, res, next) => {
    try {
      const skills = await Skill.find();
      res.send(skills);
    } catch (e) {
      next(e);
    }
  })
);

router.get(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    res.send(skill);
  })
);

router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const newSkill = new Skill(req.body);
    const postSkill = await newSkill.save();
    res.send(postSkill);
  })
);

router.put(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const putSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(putSkill);
  })
);

router.delete(
  '/:id',
  auth,
  asyncMiddleware(async (req, res) => {
    const deleteSkill = await Skill.findByIdAndRemove(req.params.id);
    res.send(deleteSkill);
  })
);

module.exports = router;
