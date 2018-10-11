const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../models/user.model');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });

        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
          return done('Invalid email or password.', null);
        }
        return done(null, user);
      }
    )
  );
};
