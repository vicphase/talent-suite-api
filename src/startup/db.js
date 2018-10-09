const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(
    config.get('db'),
    { useNewUrlParser: true }
  );
};
