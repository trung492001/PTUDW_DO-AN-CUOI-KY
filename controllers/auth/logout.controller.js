module.exports = async (req, res) => {
  req.logout();
  res.clearCookie("connect.sid");
  res.redirect('/');
}