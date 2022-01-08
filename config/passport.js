const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Account = require('../models/account.model');
const accountService = require('../service/account.service');

passport.use('login', new localStrategy(
  async (username, password, done) => {
    try {
      const user = await accountService.authenticate(username, password);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
))

passport.serializeUser(function (user, done) {
  return done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  Account.findById(id, function (err, user) {
    return done(err, user);
  });
});

module.exports = passport;