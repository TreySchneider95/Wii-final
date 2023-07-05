const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstname: String,
    lastname: String,
    phonenumber: String,
    password: String,
    cart: []
})

module.exports = mongoose.model('User', userSchema)