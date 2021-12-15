const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: [String],
    required: true
  },
  description: String,
  brandId: String
})

module.exports = mongoose.model('Category', categorySchema, 'Category');