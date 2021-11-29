const mongoose = require('mongoose');

const dishModel = new mongoose.Schema({
    dishName: String,
    price: Number,
    ingredient: String,
    description: String,
    image: String,
    type: String
    // type: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'category'
    // }
});

module.exports = mongoose.model('dish', dishModel);