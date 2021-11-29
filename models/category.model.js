const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    image: String
});

module.exports = new mongoose.model('category', categorySchema);