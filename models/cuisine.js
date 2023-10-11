const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
  name: String,
  imageUrl:String
});

const Cuisine = mongoose.model("cuisine", cuisineSchema);

module.exports = {Cuisine}