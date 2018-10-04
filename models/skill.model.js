const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const skillSchema = new Schema({
    name: {type: String, required: true, unique: true, uniqueCaseInsensitive: true }
});

const Skill = mongoose.model('Skill', skillSchema);

function validateSkill(skill) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(skill, schema);
}

module.exports.skillSchema = skillSchema;
module.exports.Skill = Skill;
module.exports.validate = validateSkill;