const mongoose = require('mongoose');

const customerModels = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    gender: Number,
    address: String,
});

module.exports = mongoose.model('customer', customerModels);