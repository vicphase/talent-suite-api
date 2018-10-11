const passport = require('passport');

require('./passport-local')();

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Store user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retreives user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
