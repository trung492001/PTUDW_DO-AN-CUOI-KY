module.exports.get = (req, res) => {
  res.locals.breadcrumb = [{
    name: 'Home',
    link: '/'
  }, {
    name: 'Giỏ hàng'
  }]
  res.render('cart');
}