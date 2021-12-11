const { Admin } = require("../config/role");

module.exports = async (req, res, next) => {
  if (!req.user || req.user.role < Admin) {
    return res.redirect('/login');
  } else {
    return next();
  }
}