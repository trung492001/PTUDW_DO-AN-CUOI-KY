const mongoose = require('mongoose');

const token = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user',
    },
    token:{
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
        expires: 3600,
    }
});

module.exports = mongoose.model('token', token);