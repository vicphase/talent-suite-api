const mongoose = require('mongoose');

module.exports = function() {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(
    'mongodb://localhost/talent-suite',
    { useNewUrlParser: true }
  );
};
