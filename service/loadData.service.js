const dishModels = require('../models/dish.model');

const loadMenu = async function(dataType) {
    const dishData = await dishModels.find(
        {
          type: dataType,
        },
    );
    return dishData;
};

const loadProductInfo = async function(productId) {
    const productInfo = await dishModels.findOne(
        {_id: productId},
    );
    return productInfo;
}

module.exports = {
    loadMenu,
    loadProductInfo
};