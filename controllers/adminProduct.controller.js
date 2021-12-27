const productService = require('../service/productData.service');
const categoryService = require('../service/category.service');
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

module.exports.addNewCategory = async function(req, res) {
    let image;
    if (req.file) {
        image = req.file.path.split('\\').slice(1).join('/').replace('images/','');
    } else {
        image = 'default-avatar.png';
    }
    await categoryService.addNewCategory(req.body, image);
    res.redirect('/dashboard/store');
}