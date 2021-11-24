const mongoose = require('mongoose');

const customerModels = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    gender: String,
    address: String,
});

module.exports = mongoose.model('customer', customerModels);