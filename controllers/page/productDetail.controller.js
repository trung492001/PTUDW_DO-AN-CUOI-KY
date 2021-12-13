const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    const productData = await productService.getOneProduct(req.query.productId);
    res.locals.product = productData;
    res.render('detailLaptop');
}