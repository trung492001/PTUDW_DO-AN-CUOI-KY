const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true
  }
})

module.exports = new mongoose.model('Category', categorySchema, 'Category');