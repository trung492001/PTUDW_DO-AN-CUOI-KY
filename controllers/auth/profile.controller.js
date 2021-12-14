const accountService = require('../../service/account.service');

module.exports.post = async (req, res, next) => {
    accountService.Update(req.user,req.body);
    res.redirect('/profile');
}
module.exports.get = async (req, res) => {
    res.render('profilePage');
}