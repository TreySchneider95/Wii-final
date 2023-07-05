const mongoose = require('mongoose')

const sockSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    quantity: Number
})

module.exports = mongoose.model('Sock', sockSchema)