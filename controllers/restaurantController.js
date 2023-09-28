const {Restaurant} = require("../models/restaurant");
const Restaurant = require('../models/restaurant');

// Controller function to get all restaurants in an area
const getAllRestaurants = async (req, res) => {
  try {
    // You can filter restaurants based on the area (location) here
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRestaurants,
};