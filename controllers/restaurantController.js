const { Restaurant } = require('../models/restaurant')

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
        const cuisine = req.query.cuisine

        if (!cuisine) {
            return res
                .status(400)
                .json({ message: 'Cuisine parameter is missing' })
        }

        const byCuisine = await Restaurant.find({ cuisine })

        if (!byCuisine || byCuisine.length === 0) {
            return res.status(404).json({
                message: 'No restaurants found for the specified cuisine',
            })
        }

    res.status(200).json(byCuisine);
  } catch (error) {
    console.error('Error in getRestaurantsByCuisine:', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const getMenuItemsByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.query.restaurantId

        if (!restaurantId) {
            return res
                .status(400)
                .json({ message: 'Restaurant ID parameter is missing' })
        }

        const restaurant = await Restaurant.findById(restaurantId)

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }

        if (!restaurant.menu || restaurant.menu.length === 0) {
            return res.status(404).json({
                message: 'No menu items found for the specified restaurant',
            })
        }

        const menuItems = restaurant.menu

        res.status(200).json(menuItems)
    } catch (error) {
        console.error('Error in getMenuItemsByRestaurant:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getRestaurantDetailsById = async (req, res) => {
    try {
        const restaurantId = req.query.restaurantId

        if (!restaurantId) {
            return res
                .status(400)
                .json({ message: 'Restaurant ID parameter is missing' })
        }

        const restaurant = await Restaurant.findById(restaurantId)

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }

        res.status(200).json(restaurant)
    } catch (error) {
        console.error('Error in getRestaurantDetailsById:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getRestaurantMenuByCategory = async (req, res) => {
    try {
        const restaurantId = req.query.restaurantId
        const category = req.query.category

        const restaurant = await Restaurant.findById(restaurantId)

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }

        const menuItems = restaurant.menu.filter(
            (item) => item.category === category
        )

        if (menuItems.length === 0) {
            return res.status(404).json({
                message: `No menu items found in the category: ${category}`,
            })
        }

    res.status(200).json({menuItems}); // Change status code to 200 for a successful GET request
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantsByCuisine,
  getMenuItemsByRestaurant,
  getRestaurantDetailsById,
  getRestaurantMenuByCategory,
};
