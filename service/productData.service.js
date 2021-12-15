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

// Loc gia
const filterPrice = function(data, priceScale) {
    
    if(priceScale === 1) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].price < 50000000) {
                data.splice(i, 1);
                i--;
            }
        }
    }
    if(priceScale === 2) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].price < 40000000 || data[i].price > 49999999) {
                data.splice(i, 1);
                i--;
            }
        }
    }
    if(priceScale === 3) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].price < 30000000 || data[i].price > 39999999) {
                console.log(data[i].price);
                data.splice(i, 1);
                i--;
            }
        }
    }
    if(priceScale === 4) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].price < 20000000 || data[i].price > 29999999) {
                data.splice(i, 1);
                i--;
            }
        }
    }
    if(priceScale === 5) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].price < 10000000 || data[i].price > 19999999) {
                data.splice(i, 1);
                i--;
            }
        }
    }
    
    return data;
}

//Loc loai hàng
const filterProductType = function(data, type) {
    for(let i = 0; i < data.length; i++) {
        if(data[i].type !== parseInt(type)) {
            data.splice(i,1);
            i--;
        }
    }
    return data;
}

// Loc theo CPU
const filterCPU = function(data, cpuType) {
    for(let i = 0; i < data.length; i++) {
        if(data[i].cpuType !== parseInt(cpuType)) {
            data.splice(i,1);
            i--;
        }
    }
    return data;
}

// Loc theo RAM
const filterRAM = function(data, ramType) {
    for(let i = 0; i < data.length; i++) {
        if(data[i].ramType !== parseInt(ramType)) {
            data.splice(i,1);
            i--;
        }
    }
    return data;
}

module.exports = {
    getProductData,
    getRandomProduct,
    getOneProduct,
    getProductByBrand,
    filterPrice,
    filterProductType,
    filterCPU,
    filterRAM
}