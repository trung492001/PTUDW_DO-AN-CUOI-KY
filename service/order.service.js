const { BadRequest } = require("../utils/response");
const { getMinInfoByIdArray } = require("./productData.service");
const Order = require("../models/order.model");


module.exports.createOrder = async ({ _id: user }, { name: username, phone, address, cart }) => {
  const productIdArr = cart.map(e => e.productId);

  const cartProductInfo = await getMinInfoByIdArray(productIdArr);
  if (productIdArr.length !== cartProductInfo.length) {
    throw new BadRequest("Thông tin giỏ hàng không đúng!");
  }

  let total = 0;

  const orderCartPayload = cartProductInfo.map(e => {
    const qty = cart.find(cartElement => cartElement.productId == e._id).quantity;
    total += e.price * qty;
    return {
      productId: e._id,
      unitPrice: e.price,
      quantity: qty
    }
  })

  await Order.create({
    user,
    username,
    phone,
    address,
    cart: orderCartPayload,
    total
  })
}

module.exports.getMonthlySale = async (date) => {
  const thisMonthOrder = await Order.find({ createdAt: { $gte: date } }, "total");
  const sales = thisMonthOrder.reduce((sum, e) => sum + e.total, 0);
  return sales;
}

//Lấy tất cả đơn hàng của customer theo id
module.exports.getOrderOfCustomer = async (idUser) => await Order.find({ user: idUser }).lean().exec();

//Lấy đơn hàng theo id
module.exports.getOrder = async (id) => await Order.findOne({ _id: id }).lean().exec();

//Lấy toàn bộ dữ liệu đơn hàng
module.exports.getOrderData = async () => {
  const orderData = await Order.find().lean().exec();
  return orderData;
};

module.exports.updateStatus = async (id, status) => {
  await Order.findByIdAndUpdate({ _id: id }, { $set: { "status": status } });
} 
