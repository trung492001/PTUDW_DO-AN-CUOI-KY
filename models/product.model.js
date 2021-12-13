const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    default: null
  },
  anonymousUser: { /**For anonymous user */
    name: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: '/images/default-avatar.png'
    }
  },
  content: {
    type: String,
    required: true
  },
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    default: null
  },
  anonymousUser: { /**For anonymous user */
    name: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: '/images/default-avatar.png'
    }
  },
  content: {
    type: String,
    required: true
  },
  reply: [replySchema]
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  information: [String],
  brand: Number,
  type: Number,
  cpuType: Number,
  ramType: Number,
  comment: [commentSchema]
});

module.exports = mongoose.model('Product', productSchema, 'Product');