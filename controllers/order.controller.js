const catchAsync = require("../utils/catchAsync");
const orderService = require("../service/order.service");

module.exports.add = catchAsync(async (req, res) => {
  await orderService.createOrder(req.user, req.body);
  
  res.send("Success");
})