const registerValidation = require("../../validation/account/register.validation")
const accountService = require('../../service/account.service');
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
  const { email, username, name, password } = value;

  if (await accountService.checkExistAccount(username, email)) {
    console.log('Username or email is already taken!');
    res.render('register', { error: 'Username or email is already taken!' });
  }

  await accountService.createNewAccount(name, username, password, email);

  res.redirect('/login?active-account');
}


module.exports.active = async (req, res, next) => {
  const { title, status } = await accountService.activeAccount(req.params.activeToken);
  console.log(title, status);
  res.render('messageActiveAccount', { title: title, status: status });
}