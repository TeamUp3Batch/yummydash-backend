const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  restaurantId: {type: String, required: true},
  userName:{type:String,required:true},
  userContact:{type:String,required:true},
  userAddress:{type:String,required:true},
  restaurantAddress:{type:String,required:true},
  menuItems: [{
    itemId: {type: String},
    name: {type: String},
    perPrice: {type: Number},
    price: {type: Number},
    quantity: {type: Number}}],
  total: {type: Number, required: true, default: 0},
  cartCreationTime: {type: Date, default: Date.now},
  checkoutTime: {type: Date},
  country: {type: String},
  currency: {type: String},
  paymentType: {type: String},
  orderStatus: {
    type: String,
    enum: ['initial', 'payment', 'acceptance', 'preparation', 'ready', 'pickup', 'delivery'],
    default: 'initial',
  },
});

const Cart = mongoose.model('cart', cartSchema)


module.exports = { Cart }
