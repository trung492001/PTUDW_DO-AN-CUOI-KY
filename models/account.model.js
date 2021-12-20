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
  phone: String,
  avatar: {
    type: String,
    default: '/images/default-avatar.png'
  },
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }],
  banStatus: 0,
  active: {
    type: Boolean,
    default: false
  },
  activeToken: String,
  activeExpires: Date,
})

module.exports = mongoose.model('Account', accountSchema, 'Account');