const { Cuisine } = require("../models/cuisine");

const getAllCuisines = async (req, res) => {
    try {
      // You can filter restaurants based on the area (location) here
      const cuisines = await Cuisine.find();
      res.json(cuisines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
module.exports = {
    getAllCuisines,
};
