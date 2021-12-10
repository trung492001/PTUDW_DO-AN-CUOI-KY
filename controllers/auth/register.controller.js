const registerValidation = require("../../validation/account/register.validation")
const accountService = require('../../service/account.service');
const passport = require("passport");
module.exports.get = async (req, res) => {
  res.render('register');
}

module.exports.post = async (req, res, next) => {
  const { error, value } = registerValidation.validate(req.body, {
    allowUnknown: true
  });

  if (error) {
    res.render('register', { error: error.message });
    return next();
  }
  const { email, username } = value;

  if (await accountService.checkExistAccount(username, email)) {
    res.render('register', { error: 'Username or email is already taken!' });
    return next();
  }

  passport.authenticate('register', {
    successRedirect: '/'
  })(req, res, next)
}