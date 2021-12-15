const accountService = require('../../service/account.service');
const changePasswordValidation = require('../../validation/account/changePassword.validation');

module.exports.postProfile = async (req, res, next) => {
    accountService.Update(req.user,req.body);
    res.redirect('/profile');
}
module.exports.get = async (req, res) => {
    res.render('profilePage');
}

module.exports.postPassword = async(req,res) =>{
    const { error, value } = changePasswordValidation.validate(req.body, {
        allowUnknown: true
    });
    if (error) {
        console.log("Error",error.message);
        res.render('profilePage', { error: error.message });
    }
    const result = await accountService.changePassword(req.user._id,req.body.oldPassword,req.body.newPassword)
    if (result === null) {
        res.render('profilePage', {error: 'Mật khẩu hiện tại không đúng'});
    }
    res.redirect('/profile');
}