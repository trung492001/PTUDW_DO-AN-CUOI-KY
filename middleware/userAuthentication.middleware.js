var passport = require('passport');

const userAuthentication = function(req, res, next) {
    passport.authenticate('local', {
        failureRedirect: '/sign-in',
        failureFlash: true,
    })(req, res, next)
}

module.exports = {
    userAuthentication,
}