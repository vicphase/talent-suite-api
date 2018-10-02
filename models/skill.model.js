const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    name: {type: String, unique: true, uniqueCaseInsensitive: true }
});

module.exports = mongoose.model('Skill', skillSchema);