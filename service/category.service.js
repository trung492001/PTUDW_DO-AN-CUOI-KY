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

const addNewCategory = async function(categoryInfo, image) {
    const category = await getAllCategory();
    const newCategory = await categoryModels.create({
        name: categoryInfo.name,
        thumbnail: [image],
        brandId: category.length,
        description: categoryInfo.description
    });
    newCategory.save();
}

module.exports = {
    getCategoryByBrand,
    getAllCategory,
    addNewCategory
}