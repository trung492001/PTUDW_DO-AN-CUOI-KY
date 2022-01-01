const productService = require('../../service/productData.service');
const commentService = require('../../service/comment.service');

module.exports = async (req, res) => {
    const productData = await productService.getOneProduct(req.query.productId);
    const recommendProduct = await productService.recommendProduct(productData.brand, productData.ramType, productData.cpuType, req.query.productId);
    res.locals.breadcrumb = [{
        name: 'Trang chủ',
        link: '/',
    }, {
        name: 'Máy tính xách tay'
    }]
    res.locals.product = productData;
    res.locals.recommendProduct = recommendProduct;
    res.locals.commentCount = await commentService.countComment(req.query.productId);
    res.render('detailLaptop');
}