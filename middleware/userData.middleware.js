module.exports = async (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  return next();
}