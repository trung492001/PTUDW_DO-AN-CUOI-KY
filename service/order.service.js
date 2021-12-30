const { BadRequest } = require("../utils/response");
const { getMinInfoByIdArray } = require("./productData.service");
const Order = require("../models/order.model");


module.exports.createOrder = async ({ _id: user }, { name: username, phone, address, cart }) => {
  const productIdArr = cart.map(e => e.productId);
  
  const cartProductInfo = await getMinInfoByIdArray(productIdArr);
  if (productIdArr.length !== cartProductInfo.length) {
    throw new BadRequest("Thông tin giỏ hàng không đúng!");
  }

  const orderCartPayload = cartProductInfo.map(e => {
    return {
      productId: e._id,
      unitPrice: e.price,
      quantity: cart.find(cartElement => cartElement.productId == e._id).quantity
    }
  })

  await Order.create({
    user,
    username,
    phone,
    address,
    cart: orderCartPayload
  })
}
//Lấy tất cả đơn hàng của customer theo id
module.exports.getOrderOfCustomer = async(idUser) => await Order.find({user: idUser}).lean().exec();

//Lấy đơn hàng theo id
module.exports.getOrder = async(id) => await Order.findOne({_id: id}).lean().exec(); 