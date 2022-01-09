const passport = require("passport");

module.exports.get = async (req, res) => {
  const activeMess = req.query['active-account'] !== undefined;
  if (activeMess)
    res.render('login', {activeMess});
  else{
    const wrongCredential = req.query['wrong-credentials'] !== undefined;
    res.render('login', { wrongCredential });
  }
}

module.exports.post = async (req, res, next) => {
  passport.authenticate('login', {
    failureRedirect: '/login?wrong-credentials',
    successRedirect: '/'
  })(req, res, next)
}