const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    const productData = await productService.getProductByBrand(req.body.type);
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 20;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;
    const productArray = productData.slice(begin, end);
    res.locals.product = productArray;
    res.redirect('/');
}