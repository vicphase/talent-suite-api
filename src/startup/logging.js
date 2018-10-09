require('express-async-errors');
const winston = require('winston');

module.exports = () => {
  process.on('uncaughtException', e => {
    winston.error(e.message, e);
    process.exit(1);
  });

  process.on('unhandledRejection', e => {
    winston.error(e.message, e);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
};
