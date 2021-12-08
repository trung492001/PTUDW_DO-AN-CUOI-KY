var passportUser = require('passport');

const registerAuthentication = function(req, res, next) {
    passportUser.authenticate('register', {
        failureRedirect: '/register',
        failureFlash: true,
    })(req, res, next)
}

module.exports = {
    registerAuthentication,
}