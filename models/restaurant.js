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
  ratings: null,
  reviews: [],
  openingHours: {},
  // Add other fields as needed (e.g., ratings, reviews, delivery options, opening hours, etc.)
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
