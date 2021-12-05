var passport = require('passport');

const staffLogin = function(req, res) {
    res.cookie('staffId', req.user._id, { httpOnly: true , signed: true});
    res.redirect('/');
}

module.exports = {
    staffLogin,
}