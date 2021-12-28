const productService = require('../service/productData.service');
const categoryService = require('../service/category.service');
const productModel = require('../models/product.model');

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

module.exports.editProduct = async function(req, res) {
    const product = await productService.getOneProduct(req.query.productId);
    let image;
    if (req.file) {
        image = req.file.path.split('\\').slice(1).join('/').replace('images/','');
    } else {
        image = product.thumbnail[0];
    }
    const productData = await productModel.updateOne({
        _id: req.query.productId
    }, {
            $set: {
                "name": req.body.name,
                "thumbnail.0": image,
                "price": req.body.price,
                "information.1": req.body.man_hinh,
                "information.3": req.body.card,
                "information.4": req.body.luu_tru,
                "information.5": req.body.pin,
                "information.6": req.body.ket_noi_chinh,
                "information.7": req.body.can_nang,
                "information.8": req.body.he_dieu_hanh,
                "brand": req.body.type,
                "type": req.body.status,
                "ramType": req.body.ram,
                "cpuType": req.body.cpu,
            }
    });
    res.redirect('/dashboard/store');
}

module.exports.deleteProduct = async function(req, res) {
    await productModel.deleteOne(
        { _id: req.query.productId }
    )
    res.redirect('/dashboard/store');
}