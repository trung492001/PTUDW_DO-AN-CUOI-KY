const Account = require("../models/account.model");
const { comparePassword, hashPassword } = require("../utils/crypto");
const random = require('randomstring');
const mailer = require('../utils/mail');
const Token = require('../models/token.model');

module.exports.checkExistAccount = async (username, email) => await Account.exists({
  $or: [{
    username: username
  }, {
    email: email
  }
  ]
})


module.exports.authenticate = async (username, password) => {
  const user = await Account.findOne({ username: username }, "password role avatar name banStatus").lean();
  if (!user) {
    return null;
  }
  if (!comparePassword(password, user.password)) {
    return null;
  }
  delete user.password;
  return user;
}

module.exports.createNewAccount = async (name, username, password, email) => {
  const user = await Account.create({name, username, password: hashPassword(password), email,
                        activeToken: random.generate(),
                        activeExpires: Date.now() + 24 * 3600 * 1000,});
  
  const link = 'http://localhost:3000/account/active/'+ user.activeToken;
  mailer.send({
    to: email,
    subject: 'Welcome',
    html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
  });
  return user;
}

module.exports.Update = async (user, newInfo) => {
  let name = newInfo.name;
  let username = newInfo.username;
  let email = newInfo.email;
  let phone = newInfo.phone;
  let address = newInfo.address;
  const update = await Account.findByIdAndUpdate({_id: user.id}, {$set: {"name": name, "username": username, "email": email, "phone":phone, "address": address}});
}

module.exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await Account.findById({_id: userId});
  if(!comparePassword(oldPassword, user.password)){
    console.log("wrong pass");
    return null;
  }
  user.password = hashPassword(newPassword);
  await user.save();
}

module.exports.getAllAccount = async () =>{
  const users = await Account.find({}).lean().exec();
  return users;
};

module.exports.activeAccount = async (token) => {
  const user = await Account.findOne({activeToken: token, activeExpires: {$gt: Date.now()}});
  if (!user){
    return {
        title: 'active',
        status: 'fail'
    };
  }

  //active and save
  user.active = true;
  await user.save();

  // activation success
  return {
    title:'active',
    status: 'success'
  };
}

module.exports.sendLinkResetPassword = async(email) => {
  const user = await Account.findOne({email: email});
  if (!user)
    return null;
  let token = await Token.findOne({userId: user._id});
  if (!token){
    token = await Token.create({
      userId: user._id,
      token: random.generate()
    });
  }
  const link = `http://localhost:3000/account/password-reset/${user._id}/${token.token}`;
  mailer.send({
    to: email,
    subject: 'Reset Password',
    html: '<h2>You have request to reset password</h2>' + 
          '<p>Please click <a href="' + link + '"> here </a> to reset your password.</p>'
  });
  return user;
}

module.exports.resetPassword = async(userId,resetToken,password) => {
  const user = await Account.findById(userId).exec();
  if(!user){
    console.log("not exists user");
    return null;
  }
  const token = await Token.findOne({
    userId: userId,
    token: resetToken
  });
  if (!token){
    console.log("wrong token"); 
    return null;
  }
  user.password = hashPassword(password);
  await user.save();
  await token.delete();
  return {messsage:'Success'};
}

module.exports.updateStatus = async function(userId, updateStatus) {
  await Account.findByIdAndUpdate({_id: userId}, {$set: {"banStatus": updateStatus}});
}

module.exports.getUserById = async(userId) => await Account.findById(userId)