const accountService = require('../../service/account.service'); 

module.exports.get = async (req,res) => {
    res.locals.activeCell = 'accounts';
    res.locals.accountData = await accountService.getAllAccount();
    res.render('accountDashBoard');
}