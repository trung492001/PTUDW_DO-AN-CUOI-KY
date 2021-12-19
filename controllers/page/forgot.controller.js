const accountService = require('../../service/account.service');

module.exports.get = async (req,res) => {
    res.render('forgotPassword');
}

module.exports.post = async (req,res) => {
    const result = await accountService.sendLinkResetPassword(req.body.email);
    if (result)
        res.redirect('/');
}