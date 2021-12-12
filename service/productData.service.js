const productModels = require('../models/product.model');

const getProductData = async function() {
    const productData = await productModels.find();
    return productData;
};

const getRandomProduct = async function() {
    const productData = await productModels.aggregate([
        { $sample: { size: 10 } }
    ]);
    return productData;
};

module.exports = {
    getProductData,
    getRandomProduct
}