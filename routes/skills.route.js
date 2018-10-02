var express = require("express");
var router = express.Router();
var Skill = require("../models/skill.model");

router.get("/", function(req, res) {
  Skill.find()
    .then(skills => res.status(200).json(skills))
    .catch(err => res.status(500).json(err));
});

/* GET a single skill */
router.get("/:id", function(req, res, next) {
  Skill.findById(req.params.id)
    .then(skills => res.status(200).json(skills))
    .catch(err => res.status(500).json(err));
});

router.post("/", function(req, res) {
  var skill = new Skill(req.body);
  skill.save
    .then(skill => res.status(201).json(skill))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", function(req, res) {
  Skill.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(skill => res.status(201).json(skill))
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", function(req, res) {
  Skill.findByIdAndRemove(req.params.id)
    .then(skill => res.status(201).json(skill))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
