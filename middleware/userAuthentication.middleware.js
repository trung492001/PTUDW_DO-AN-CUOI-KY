var passportUser = require('passport');

const userAuthentication = function(req, res, next) {
    passportUser.authenticate('user', {
        failureRedirect: '/sign-in',
        failureFlash: true,
    })(req, res, next)
}

module.exports = {
    userAuthentication,
}