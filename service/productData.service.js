const productModels = require('../models/product.model');

const getProductData = async function() {
    const productData = await productModels.find();
    return productData;
};

module.exports = {
    getProductData,
}