const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../models/user.model');
const passportJWT = require('passport-jwt');
const config = require('config');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, next) => {
        const user = await User.findOne({ email: email });

        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
          return next('Invalid email or password.', null);
        }
        return next(null, user);
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('jwtPrivateKey')
      },
      async (jwtPayload, next) => {
        try {
          const user = await User.findById(jwtPayload._id);
          next(null, user);
        } catch (e) {
          next('Invalid token.', null);
        }
      }
    )
  );
};
