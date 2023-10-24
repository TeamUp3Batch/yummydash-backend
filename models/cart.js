const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  id: {type: String},
  menuItemId: {type: String},
  quantity: {type: Number},
  name: {type: String},
  subtotal: {type: Number},
  total: {type: Number},
  priceEach: {type: Number},
});

const menuItemSchema = new mongoose.Schema({
  itemId: {type: String},
  name: {type: String},
  perPrice: {type: Number},
  price: {type: Number},
  quantity: {type: Number},
});

const foodEstimateSchema = new mongoose.Schema({
  minEstimatedTime: {type: Number},
  medEstimatedTime: {type: Number},
  maxEstimatedTime: {type: Number},
});

const taxesSchema = new mongoose.Schema({
  SERVICE_FEE_TOTAL: {type: Number},
  GST: {type: Number},
});

const cartSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  restaurantId: {type: String, required: true},
  menuItems: [menuItemSchema],
  total: {type: Number, required: true, default: 0},
  cartCreationTime: {type: Date, default: Date.now},
  checkoutTime: {type: Date},
  foodEstimate: foodEstimateSchema,
  taxes: taxesSchema,
  country: {type: String},
  currency: {type: String},
  paymentType: {type: String},
  lineItems: [lineItemSchema],
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = {Cart};
