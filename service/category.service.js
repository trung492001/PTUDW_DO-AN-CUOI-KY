const categoryModels = require('../models/category.model');

const getCategoryByBrand = async function(brandCode) {
    const productData = await categoryModels.findOne(
        {brandId: brandCode}
    ).lean().exec();
    return productData;
}

module.exports = {
    getCategoryByBrand
}