const { BadRequest } = require("../utils/response");
const { getMinInfoByIdArray } = require("./productData.service");
const Order = require("../models/order.model");
const month = require("../config/month");


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

module.exports.getMonthlySale = async (startDate, endDate) => {
  const sales = await Order.aggregate()
    .match({
      createdAt: { $gte: startDate, $lte: endDate }
    })
    .group({
      _id: {
        year_month: {
          $substrCP: ["$createdAt", 0, 7]
        }
      },
      data: { $sum: "$total" }
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
