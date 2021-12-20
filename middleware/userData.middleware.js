module.exports = async (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
}