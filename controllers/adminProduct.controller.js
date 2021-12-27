const productService = require('../service/productData.service');

module.exports.addNewProduct = async function(req, res) {
    let image;
    if (req.file) {
        image = req.file.path.split('\\').slice(1).join('/').replace('images/','');
    } else {
        image = 'default-avatar.png';
    }
    await productService.addNewProduct(req.body, image);
    res.redirect('/dashboard/store');
}