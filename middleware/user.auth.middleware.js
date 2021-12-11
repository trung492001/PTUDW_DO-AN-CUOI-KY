module.exports = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  } else {
    return next();
  }
}