const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    const productData = await productService.getRandomProduct();
    res.locals.product = productData;
    res.render('index');
}