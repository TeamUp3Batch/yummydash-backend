const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
    },
    otpCreatedAt: {
        type: Date,
    },
    otpExpiry: {
        type: Date,
    },
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = { Admin }
