const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: {type: Buffer, required: false},
});

const Menu = mongoose.model('menu', menuSchema);

module.exports = {Menu};
