const month = require('../config/month');
const productModel = require('../models/product.model');

// Lay toan bo du lieu ve Product
const getProductData = async function () {
  const productData = await productModel.find();
  return productData;
};

// Lay Random 10 products
const getRandomProduct = async function (size) {
  const productData = await productModel.aggregate([
    { $sample: { size: size } }
  ]);
  return productData;
};

// Lay 1 product theo Id
const getOneProduct = async function (productId) {
  const productData = await productModel.findOne(
    { _id: productId }
  ).lean().exec();
  return productData;
};

//Lay ten product theo Id
const getNameProduct = async function (productId) {
  const productName = await productModel.findOne(
    { _id: productId },
    { name: 1 }
  ).lean().exec();
  return productName;
};

const getProductByBrand = async function (brandCode) {
  const productData = await productModel.find(
    { brand: brandCode }
  );
  return productData;
}

// Loc gia
const filterPrice = function (data, priceScale) {

  if (priceScale === 1) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 50000000) {
        data.splice(i, 1);
        i--;
      }
    }
  }
  if (priceScale === 2) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 40000000 || data[i].price > 49999999) {
        data.splice(i, 1);
        i--;
      }
    }
  }
  if (priceScale === 3) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 30000000 || data[i].price > 39999999) {
        console.log(data[i].price);
        data.splice(i, 1);
        i--;
      }
    }
  }
  if (priceScale === 4) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 20000000 || data[i].price > 29999999) {
        data.splice(i, 1);
        i--;
      }
    }
  }
  if (priceScale === 5) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].price < 10000000 || data[i].price > 19999999) {
        data.splice(i, 1);
        i--;
      }
    }
  }

  return data;
}

//Loc loai hàng
const filterProductType = function (data, type) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].type !== parseInt(type)) {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}

// Loc theo CPU
const filterCPU = function (data, cpuType) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].cpuType !== parseInt(cpuType)) {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}

// Loc theo RAM
const filterRAM = function (data, ramType) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].ramType !== parseInt(ramType)) {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}

const getMinInfoByIdArray = async (arrayId) => {
  const product = await productModel.find()
    .where('_id')
    .in(arrayId)
    .select('_id name thumbnail price')
    .lean();

  return product;
}

const getMonthlyNewProduct = async (startDate, endDate) => {
  const product = await productModel.aggregate()
    .match({
      createdAt: { $gte: startDate, $lte: endDate }
    })
    .group({
      _id: {
        year_month: {
          $substrCP: ["$createdAt", 0, 7]
        }
      },
      data: { $sum: 1 }
    })
    .sort({
      "_id.year_month": 1
    })
    .project({
      _id: 0,
      data: 1,
      month_year: {
        $concat: [
          {
            $arrayElemAt: [
              month, {
                $subtract: [
                  {
                    $toInt: {
                      $substrCP: ["$_id.year_month", 5, 2]
                    }
                  }, 1
                ]
              }]
          }, "-",
          {
            $substrCP: ["$_id.year_month", 0, 4]
          }
        ],
      }
    })
  return product;
}

const addNewProduct = async function (productInfo, image) {
  const newProduct = await productModel.create({
    name: productInfo.name,
    thumbnail: [image],
    price: productInfo.price,
    information: [
      productInfo.cpu,
      productInfo.man_hinh,
      productInfo.ram,
      productInfo.card,
      productInfo.luu_tru,
      productInfo.pin,
      productInfo.ket_noi_chinh,
      productInfo.can_nang,
      productInfo.he_dieu_hanh
    ],
    brand: productInfo.type,
    type: productInfo.status,
    ramType: productInfo.ram,
    cpuType: productInfo.cpu
  });
  newProduct.save();
}

// Lay 5 san pham cung phan khuc
const recommendProduct = async function (brandId, ramId, cpuId, productId) {
  const productData = await getProductByBrand(brandId);
  const productArray = [];
  for (let i = 0; i < productData.length; i++) {
    if ((productData[i].ramType === ramId || productData[i].cpuType === cpuId) && productData[i]._id != productId) {
      productArray.push(productData[i]);
    }
  }
  console.log(productArray);
  return productArray.slice(0, 5);
}

module.exports = {
  getProductData,
  getRandomProduct,
  getOneProduct,
  getNameProduct,
  getProductByBrand,
  filterPrice,
  filterProductType,
  filterCPU,
  filterRAM,
  getMinInfoByIdArray,
  getMonthlyNewProduct,
  addNewProduct,
  recommendProduct
}