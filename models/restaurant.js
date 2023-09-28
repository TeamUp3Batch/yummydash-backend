const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    },
  ],
  ratings: Number,
  reviews: [],
  openingHours: {},
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = {Restaurant}
