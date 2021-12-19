const accountService = require('../../service/account.service');

module.exports.get = async(req,res) => {
    res.locals.userId = req.params.userId;
    res.locals.token = req.params.token;
    res.render('resetPassword');
}

module.exports.post = async(req,res) => {
    const changePasswordValidation = require('../../validation/account/changePassword.validation');
    const { error, value } = changePasswordValidation.validate(req.body, {
        allowUnknown: true
    });
    if (error) {
        console.log("Error",error.message);
        res.render('resetPassword', { error: error.message });
    }
    const {userId,token} = req.params;
    const password = req.body.newPassword;
    const result = await accountService.resetPassword(userId,token,password);
    if (result)
        res.redirect('/login');
}