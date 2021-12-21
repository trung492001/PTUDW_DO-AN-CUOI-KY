module.exports.get = (req, res) => {
  res.locals.breadcrumb = [{
    name: 'Home',
    link: '/'
  }, {
    name: 'Giỏ hàng',
    link: '/cart'
  }, {
    name: 'Đặt hàng'
  }]
  res.render('placeOrder');
}

module.exports.success = (req, res) => res.render('orderSuccess')