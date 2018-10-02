const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true, uniqueCaseInsensitive: true },
    skills: [{ skill: { type: Schema.ObjectId, ref: 'Skill' }, level: Number }],
});

module.exports = mongoose.model('User', userSchema);