const userModels = require('../models/customer.model');

const AuthMiddleware = async function(req, res, next) {
    if ((!req.signedCookies.userId)) {
        res.redirect('/sign-in');
        return;
    }
    next();
};

const StaffAuthMiddleware = function(req, res, next) {
    if (!req.signedCookies.staffId) {
        res.redirect('/sign-in-staff');
        return;
    }
    next();
};

module.exports = {
    AuthMiddleware,
    StaffAuthMiddleware
}