const accountService = require('../../service/account.service');

module.exports.banUser = function(req, res) {
    accountService.updateStatus(req.query.userId, 1);
    res.redirect('/dashboard/accounts');
}

module.exports.unbanUser = function(req, res) {
    accountService.updateStatus(req.query.userId, 0);
    res.redirect('/dashboard/accounts');
}