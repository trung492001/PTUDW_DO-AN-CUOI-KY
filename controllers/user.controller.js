const passport = require('passport');

const userLogin = function(req, res) {
    res.cookie('userId', req.user._id, { httpOnly: true , signed: true});
    res.redirect('/');
}

module.exports = {
    userLogin,
}