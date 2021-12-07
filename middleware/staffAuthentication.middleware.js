var passport = require('passport');

const staffAuthentication = function(req, res, next) {
    passport.authenticate('staff', {
        failureRedirect: '/sign-in-staff',
        failureFlash: true,
    })(req, res, next)
}

module.exports = {
    staffAuthentication,
}