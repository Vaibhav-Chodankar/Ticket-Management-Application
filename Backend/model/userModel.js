const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        uniquie: true
    },
    email: {
        type: String,
        required: true,
        uniquie: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Users', userSchema);