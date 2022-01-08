const mongoose = require('mongoose');
const orderStatus = require('../config/orderStatus');

const orderSchema = new mongoose.Schema({
  user: {
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
  username: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    enum: Object.values(orderStatus),
    default: orderStatus.Processing
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

module.exports = mongoose.model('Order', orderSchema, 'Order');