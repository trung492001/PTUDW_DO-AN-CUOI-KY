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