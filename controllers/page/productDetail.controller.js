const productService = require('../../service/productData.service');
const commentService = require('../../service/comment.service');

module.exports = async (req, res) => {
    const productData = await productService.getOneProduct(req.query.productId);
    res.locals.breadcrumb = [{
        name: 'Trang chủ',
        link: '/',
    }, {
        name: 'Máy tính xách tay'
    }]
    res.locals.product = productData;
    res.locals.commentCount = commentService.countComment(req.query.productId);
    res.render('detailLaptop');
}