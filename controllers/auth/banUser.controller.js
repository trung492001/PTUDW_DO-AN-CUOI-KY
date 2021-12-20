const accountService = require('../../service/account.service');

module.exports.banUser = function(req, res) {
    console.log(req.query.userId);
    accountService.updateStatus(req.query.userId, 1);
    res.redirect('/dashboard/accounts');
}