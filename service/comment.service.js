const Product = require('../models/product.model');
const mongoose = require('mongoose');

module.exports.add = async (productId, userId = null, anonymousUsername = null, content) => {
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

  const newComment = await Product.findById(productId, {
    comment: { $first: "$comment" },
    _id: 0,
  })
  .populate("comment.user", "name avatar")
  .lean()
  .exec();
  return newComment.comment
}
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
  const result = await Product.findById(productId, {
    _id: 0,
    comment: 1,
    thumbnail: 0,
    information: 0,
    name: 0,
    price: 0,
    brand: 0,
    type: 0,
    ramType: 0,
    cpuType: 0
  })
    .slice('comment', [skip, limit])
    .populate("comment.user", "name avatar")
    .populate("comment.reply.user", "name avatar").exec();
  const resultCount = await Product.findById(productId, { _id: -1, commentCount: { $size: '$comment' } }).lean().exec()
  return {
    result: result.comment,
    resultCount: resultCount.commentCount
  }
}
