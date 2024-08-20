const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    name: {
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
    companyName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ['IT', 'Admin'],
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'closed'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    requiredTime: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tickets', ticketSchema);