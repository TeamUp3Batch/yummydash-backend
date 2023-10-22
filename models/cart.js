const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    menuItems: [{ itemId: String, name: String, perPrice: Number, price:Number, quantity: Number }],
    total: { type: Number, required: true, default: 0 },
    cartCreationTime: { type: Date, default: Date.now },
    checkoutTime : { type: Date }

})

const Cart = mongoose.model('cart', cartSchema)

module.exports = { Cart }
