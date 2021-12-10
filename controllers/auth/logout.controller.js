module.exports = async (req, res) => {
  req.logout();
  res.redirect('/');
}