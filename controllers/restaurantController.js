const {Restaurant} = require("../models/restaurant");

// Controller function to get all restaurants in an area
const getAllRestaurants = async (req, res) => {
  try {
    // You can filter restaurants based on the area (location) here
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantsByCuisine = async(req,res)=>{
    try{
        const byCuisine = await Restaurant.find({cuisine:req.body.cuisine})
        res.json(byCuisine);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
  getAllRestaurants,
  getRestaurantsByCuisine
};