const Account = require("../models/account.model");
const { comparePassword, hashPassword } = require("../utils/crypto");

module.exports.checkExistAccount = async (username, email) => await Account.exists({
  $or: [{
    username: username
  }, {
    email: email
  }
  ]
})


module.exports.authenticate = async (username, password) => {
  const user = await Account.findOne({ username: username }, "password role avatar name").lean();
  if (!user) {
    return null;
  }
  if (!comparePassword(password, user.password)) {
    return null;
  }
  delete user.password;
  return user;
}

module.exports.createNewAccount = async (name, username, password, email) => await Account.create({
  name,
  username,
  password: hashPassword(password),
  email
})