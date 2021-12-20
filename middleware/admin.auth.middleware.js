const { Admin } = require("../config/role");

module.exports = async (req, res, next) => {
  console.log(req.user);
  if (!req.user || req.user.role != Admin) {
    return res.redirect('/staffSignIn');
  } else {
    return next();
  }
}