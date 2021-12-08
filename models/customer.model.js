const mongoose = require('mongoose');

const customerModels = new mongoose.Schema({
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
    image:{
        type:String,
        default: 'https://tanzolymp.com/images/default-non-user-no-photo-1.jpg'
    }
});

module.exports = mongoose.model('customer', customerModels);