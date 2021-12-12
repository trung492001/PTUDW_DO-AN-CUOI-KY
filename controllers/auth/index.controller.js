const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    const productData = await productService.getProductData();
    console.log(productData);
    res.render('index');
}