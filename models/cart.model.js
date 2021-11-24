const mongoose = require('mongoose');

const cartModels = new mongoose.Schema({
    userId: String,
    cart: [
        {
            dishId: String,
            Qty: String,
            price: String,
        },
    ],
    address: String,
    phone: String,
    total: String,
});

module.exports = mongoose.model('cart', cartModels);