const productModels = require('../models/product.model');

// Lay toan bo du lieu ve Product
const getProductData = async function() {
    const productData = await productModels.find();
    return productData;
};

// Lay Random 10 products
const getRandomProduct = async function(size) {
    const productData = await productModels.aggregate([
        { $sample: { size: size } }
    ]);
    return productData;
};

// Lay 1 product theo Id
const getOneProduct = async function(productId) {
    const productData = await productModels.findOne(
        {_id: productId}
    ).lean().exec();
    return productData;
};

const getProductByBrand = async function(brandCode) {
    const productData = await productModels.find(
        {brand: brandCode}
    );
    return productData;
}

module.exports = {
    getProductData,
    getRandomProduct,
    getOneProduct,
    getProductByBrand,
}