module.exports = async (req, res, next) => {
  if (req.user && req.user.banStatus === 1) {
    req.logout();
    res.clearCookie("connect.sid");
    return res.redirect('/404');
  }  else {
    return next();
  }
}