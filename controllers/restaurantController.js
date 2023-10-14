const {Restaurant} = require('../models/restaurant');

// Controller function to get all restaurants in an area

const getAllRestaurants = async (req, res) => {
  try {
    // You can filter restaurants based on the area (location) here
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const getRestaurantsByCuisine = async (req, res) => {
  try {
    const byCuisine = await Restaurant.find({cuisine: req.body.cuisine});
    console.log('bycuisine', byCuisine);
    res.json(byCuisine);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.body.id;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItems = restaurant.menu;

    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRestaurantDetailsById = async (req, res) => {
  try {
    const restaurantId = req.body.id;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantsByCuisine,
  getMenuItemsByRestaurant,
  getRestaurantDetailsById
};
