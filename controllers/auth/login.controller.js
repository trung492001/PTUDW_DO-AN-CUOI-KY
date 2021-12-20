const passport = require("passport");

module.exports.get = async (req, res) => {
  const wrongCredential = req.query['wrong-credentials'] !== undefined;
  res.render('login', { wrongCredential });
}

module.exports.post = async (req, res, next) => {
  passport.authenticate('login', {
    failureRedirect: '/login?wrong-credentials',
    successRedirect: '/'
  })(req, res, next)
}

module.exports.staffPost = async (req, res, next) => {
  passport.authenticate('login', {
    failureRedirect: '/sign-in-staff?wrong-credentials',
    successRedirect: '/dashboard'
  })(req, res, next)
}