const mongoose = require('mongoose');
const role = require('../config/role');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: Number,
    enum: Object.values(role),
    default: role.User,
  },
  address: String,
  avatar: {
    type: String,
    default: '/images/default-avatar.png'
  },
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }],
  banUntil: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  }
})

module.exports = mongoose.model('Account', accountSchema, 'Account');