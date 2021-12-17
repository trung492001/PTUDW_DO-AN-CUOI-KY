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
    console.log(error.message);
    res.render('register', { error: error.message });
  }
  const { email, username } = value;

  if (await accountService.checkExistAccount(username, email)) {
    console.log('Username or email is already taken!');
    res.render('register', { error: 'Username or email is already taken!' });
  }

  passport.authenticate('register', {
    successRedirect: '/',
  })(req, res, next)
}

module.exports.active = async (req,res,next) => {
  const {title} = await accountService.activeAccount(req.params.activeToken);
  res.render('message', {title: title});
}