const mongoose = require('mongoose');

const cartModels = new mongoose.Schema({
    userId: String,
    cart: [
        {
        bookId: String,
        Qty: String,
        },
    ],
    address: String,
    phone: String,
    total: String,
});

module.exports = mongoose.model('cart', cartModels);