const mongoose = require('mongoose');

const staffModels = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    gender: String,
    address: String,
});

module.exports = mongoose.model('staff', staffModels);