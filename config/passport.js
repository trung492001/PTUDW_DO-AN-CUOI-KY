const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Account = require('../models/account.model');
const accountService = require('../service/account.service');

passport.use('login', new localStrategy(
  async (username, password, done) => {
    try {
      const user = await accountService.authenticate(username, password);
      console.log(user);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
))

passport.use('register', new localStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    const { email, name } = req.body;
    const user = await accountService.createNewAccount(name, username, password, email);
    return done(null, user._id);
  }
))

passport.serializeUser(function (user, done) {
  return done(null, user);
});

passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    return done(err, user);
  });
});

module.exports = passport;