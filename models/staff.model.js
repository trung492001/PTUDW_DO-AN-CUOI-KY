const mongoose = require('mongoose');

const staffModels = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    gender: Number,
    address: String,
});

module.exports = mongoose.model('staff', staffModels);