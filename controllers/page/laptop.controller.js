const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    const productData = await productService.getRandomProduct(20);
    res.locals.product = productData;
    res.render('laptop');
}