const createError = require('http-errors');
const express = require('express');
const authRoutes = require('../routes/auth.routes');
const skillsRoutes = require('../routes/skills.routes');
const usersRoutes = require('../routes/users.routes');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/auth', authRoutes);
  app.use('/api/skills', skillsRoutes);
  app.use('/api/users', usersRoutes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // log the error
    winston.error(err.message, err);

    // render the error page
    res.status(err.status || 500).send('Internal server error');
  });
};
