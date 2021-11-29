const mongoose = require('mongoose');

const cartModels = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    cart: [
        {
            dishId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'dish'
            },
            quantity: {
                type: Number,
                min: 1,
                max: 10
            },
            unitPrice: {
                type: Number,
                min: 0
            }
        },
    ],
    shippingFee: {
        type: Number,
        min: 0
    },
    address: String,
    phone: String,
    status: Number,
    total: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('cart', cartModels);