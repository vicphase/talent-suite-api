const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (username, password, done) => {
        const user = {
          username,
          password
        };
        done(null, user);
      }
    )
  );
};
