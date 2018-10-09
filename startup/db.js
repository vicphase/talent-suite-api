const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(
    config.get('db'),
    { useNewUrlParser: true }
  );
};
