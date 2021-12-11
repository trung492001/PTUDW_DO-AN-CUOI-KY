const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    default: null
  },
  anonymousUser: { /**For anonymous user */
    username: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
    }
  },
  content: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

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
  comment: [commentSchema]
});

module.exports = new mongoose.model('Product', productSchema, 'Product');