const Product = require('../models/product.model');
const mongoose = require('mongoose');

module.exports.add = async (productId, userId = null, anonymousUsername = null, content) =>
  await Product.updateOne({ _id: productId }, {
    $push: {
      comment: {
        $each: [{
          user: userId,
          anonymousUser: {
            name: anonymousUsername
          },
          content: content
        }],
        $position: 0
      }
    }
  })

module.exports.reply = async (commentId, userId = null, anonymousUsername = null, content) =>
  await Product.updateOne({ "comment._id": commentId }, {
    $push: {
      "comment.$.reply": {
        user: userId,
        anonymousUser: {
          name: anonymousUsername
        },
        content: content
      }
    }
  })

module.exports.get = async (productId, { skip, limit }) => {
  return {
    result: await Product.findById(productId, "comment -_id")
    .slice('comment', [skip, limit])
    .populate("comment.user", "name avatar")
    .populate("comment.reply.user", "name avatar"),
    resultCount: await Product.findById(productId, { commentCount: { $size: '$comment' } }).commentCount
  }
}
