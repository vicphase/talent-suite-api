const { Skill, validate } = require('../models/skill.model');

module.exports = () => {
  const getAll = async (req, res) => {
    const skills = await Skill.find();
    res.send(skills);
  };

  const get = async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    res.send(skill);
  };

  const post = async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const skill = new Skill(req.body);
    await skill.save();
    res.send(skill);
  };

  const put = async (req, res) => {
    const putSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(putSkill);
  };

  const deleteRequest = async (req, res) => {
    const deleteSkill = await Skill.findByIdAndRemove(req.params.id);
    res.send(deleteSkill);
  };

  return {
    getAll: getAll,
    get: get,
    post: post,
    put: put,
    delete: deleteRequest
  };
};
