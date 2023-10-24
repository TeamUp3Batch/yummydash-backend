const mongoose = require('mongoose');
const menuItemSchema = require('./menu');
const {Schema} = mongoose;
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  restaurantImage: {
    type: String,
    required: false,
  },
  description: String,
  cuisine: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },
  contact: {
    phone: String,
    email: String,
    website: String,
  },
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      category: String,
      image: {type: String, required: false},
    },
  ],
  ratings: Number,
  reviews: [],
  openingHours: {},
  estimateDeliveryTime: {
    minEstimatedTime: {type: Number},
    medEstimatedTime: {type: Number},
    maxEstimatedTime: {type: Number},
  },
});

const Restaurant = mongoose.model('restaurants', restaurantSchema);

module.exports = {Restaurant};
