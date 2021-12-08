const dishModels = require('../models/dish.model');

const loadMenu = async function (dataType, { skip, limit }) {
    const dishData = await dishModels.find({
        type: dataType,
    }).skip(skip)
        .limit(limit);
    
    const dishCount = await dishModels.countDocuments({
        type: dataType,
    })

    return {
        dishData,
        pageCount: Math.ceil(dishCount / limit) 
    }
};

const loadProductInfo = async function (productId) {
    const productInfo = await dishModels.findOne(
        { _id: productId },
    );
    return productInfo;
}

module.exports = {
    loadMenu,
    loadProductInfo
};