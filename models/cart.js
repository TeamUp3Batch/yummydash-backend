const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    menuItems: [{ItemId:String,name:String,price:Number}],
    total: { type: Number, required: true, default: 0 },
})

const Cart = mongoose.model('cart', cartSchema);

module.exports = {Cart};