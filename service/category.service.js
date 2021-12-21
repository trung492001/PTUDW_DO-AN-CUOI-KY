const categoryModels = require('../models/category.model');

const getCategoryByBrand = async function(brandCode) {
    const productData = await categoryModels.findOne(
        {brandId: brandCode}
    ).lean().exec();
    return productData;
}

const getAllCategory = async function() {
    const productData = await categoryModels.find();
    return productData;
}

module.exports = {
    getCategoryByBrand,
    getAllCategory
}