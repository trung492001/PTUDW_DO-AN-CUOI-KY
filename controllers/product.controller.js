const { getMinInfoByIdArray } = require("../service/productData.service");
const catchAsync = require("../utils/catchAsync");

module.exports.getMinInfoForCart = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const product = await getMinInfoByIdArray(productId);
  res.send({ result: product });
})