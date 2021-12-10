const mongoose = require('mongoose');
const orderStatus = require('../config/orderStatus');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      min: 1
    },
    unitPrice: {
      type: Number,
      min: 0,
      required: true
    }
  }],
  shippingFee: {
    type: Number,
    min: 0,
    required: true
  },
  status: {
    type: Number,
    enum: Object.values(orderStatus),
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

module.exports = new mongoose.model('Order', orderSchema, 'Order');