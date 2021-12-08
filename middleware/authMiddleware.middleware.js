const userModels = require('../models/customer.model');

const AuthMiddleware = async function(req, res, next) {
    if ((!req.signedCookies.userId)) {
        res.redirect('/sign-in');
        return;
    }
    else{
        const userData = await userModels.findOne(
            {_id: req.signedCookies.userId},
        );
        res.locals.user = userData;
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

const userAuthMiddleware =  async function(req, res, next) {
    if (req.signedCookies.staffId !== false) {
        const userData = await userModels.findOne(
            {_id: req.signedCookies.userId},
        );
        res.locals.user = userData;
    }
    next();
};
module.exports = {
    AuthMiddleware,
    StaffAuthMiddleware,
    userAuthMiddleware
}