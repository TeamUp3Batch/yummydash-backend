const {Restaurant} = require('../models/restaurant');

// Controller function to get all restaurants in an area

const insertNewRestaurant = async (req, res) => {
  console.log('inserting...............');
  try {
    console.log('trying.....');
    const newRestaurant = new Restaurant({
      name: req.body.name,
      description: req.body.description,
      cuisine: req.body.cuisine,
      address: req.body.address,
      contact: req.body.contact,
      menu: req.body.menu,
      ratings: req.body.ratings,
      reviews: req.body.reviews,
      openingHours: req.body.openingHours,
    });

    upload.single('restaurantImage'),
    async (req, res, next) => {
      if (req.file) {
        // If an image was uploaded, set the restaurantImage field to the uploaded image buffer
        newRestaurant.restaurantImage = req.file.buffer;
      }

      const savedRestaurant = await newRestaurant.save();

      res.status(201).json(savedRestaurant);
    };
  } catch (error) {
    console.log(error);
    res.send(500).json({message: 'Internal Server Error'});
  }
};
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

module.exports = {
  getAllRestaurants,
  getRestaurantsByCuisine,
  insertNewRestaurant,
};
