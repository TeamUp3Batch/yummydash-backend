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
    latitude: Number,
    longitude: Number,
    address1: String,
    street: String,
    city: String,
    province: String,
    postalCode: String,
    country:String
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
  estimatedDeliveryTime: {
    minEstimatedTime: {type: Number},
    medEstimatedTime: {type: Number},
    maxEstimatedTime: {type: Number},
  },

});

const Restaurant = mongoose.model('restaurants', restaurantSchema);

module.exports = {Restaurant};