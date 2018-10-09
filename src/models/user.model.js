const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userRoles = {
  prospect: 'prospect',
  employee: 'employee',
  admin: 'admin'
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    required: true
  },
  skills: [
    { skill: { type: mongoose.Schema.ObjectId, ref: 'Skill' }, level: Number }
  ]
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, role: this.role },
    config.get('jwtPrivateKey')
  );
};

const User = mongoose.model('User', userSchema);

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    skills: Joi.array().required()
  };

  return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.userRoles = userRoles;
