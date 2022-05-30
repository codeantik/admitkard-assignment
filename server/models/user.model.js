const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    courseLevel: {
        type: String,
        required: true,
    },
    countryPreferences: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('users', userSchema, 'user');