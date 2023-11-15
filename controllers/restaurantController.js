const {Restaurant} = require('../models/restaurant');

// Controller function to get all restaurants in an area

const getAllRestaurants = async (req, res) => {
  try {
    // You can filter restaurants based on the area (location) here
    const restaurants = await Restaurant.find()
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const getRestaurantsByCuisine = async (req, res) => {
  try {
    const cuisine = req.query.cuisine;
    const sort = req.query.sort;
    if (!cuisine) {
      return res
          .status(400)
          .json({message: 'Cuisine parameter is missing'});
    }
    let byCuisine = [];
    if (sort && sort=='rating') {
      byCuisine = await Restaurant.find({cuisine})
      .sort({ ratings: -1 });
    }
    if (sort && sort=='duration') {
      byCuisine = await Restaurant.aggregate([
       { $match : { cuisine } },
       {$unwind: '$estimatedDeliveryTime'},
       {$sort: {'estimatedDeliveryTime.minEstimatedTime':1}}
       ]);
    }else{
      byCuisine = await Restaurant.find({cuisine});
    }
    if (!byCuisine || byCuisine.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found for the specified cuisine',
      });
    }
    res.status(200).json(byCuisine);
  } catch (error) {
    console.error('Error in getRestaurantsByCuisine:', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

// Added  by Farhana
// get All reqaurant by Rating 

const getRestaurantsByRating = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .sort({ 'ratings': -1 }); // Sort by 'ratings' in descending order

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        message: 'No restaurants found.',
      });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error in getRestaurantsByRating:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// get All restaurants menus  by price 



const getRestaurantMenusByPrice = async (req, res) => {
  try {
    const menus = await Restaurant.find()
      .sort({ 'menu.price': 1 });

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        message: 'No menus found for the specified price range.',
      });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error in getRestaurantMenusByPrice:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantMenusBelowPrice = async (req, res) => {
  try {
    const maxPrice = parseFloat(req.query.maxPrice); 
    
    const menus = await Restaurant.aggregate([
      {
        $unwind: "$menu" // Unwind the menu array
      },
      {
        $match: {
          "menu.price": { $lt: maxPrice} // Filter menu items by price

        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          address: { $first: "$address" },
          cuisine: { $first: "$cuisine" },
          menu: { $push: "$menu" }
        }
      }
    ]);

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        message: 'No menus found below the specified price.',
      });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error in getRestaurantMenusBelowPrice:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Get  Restaurant Menus delivered by 


const getMenusBelowDeliveryMinTime = async (req, res) => {
  try {
    const minEstimatedTime = parseInt(req.query.minEstimatedTime);

    const menus = await Restaurant.aggregate([
      {
        $unwind: "$estimatedDeliveryTime"
      },
      {
        $match: {
          "estimatedDeliveryTime.minEstimatedTime": { $lte: minEstimatedTime }
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          address: { $first: "$address" },
          cuisine: { $first: "$cuisine" },
          menu: { $push: "$menu" },
          estimatedDeliveryTime: { $push: "$estimatedDeliveryTime" },
        }
      }
    ]);

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        message: ('No menus found with delivery time less', minEstimatedTime)
      });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error in getRestaurantMenusBelowDeliveryTime:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getMenusBelowDeliveryMedTime = async (req, res) => {
  try {
    const medEstimatedTime = parseInt(req.query.medEstimatedTime);

    const menus = await Restaurant.aggregate([
      {
        $unwind: "$estimatedDeliveryTime"
      },
      {
        $match: {
          "estimatedDeliveryTime.medEstimatedTime": { $lte: medEstimatedTime }
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          address: { $first: "$address" },
          cuisine: { $first: "$cuisine" },
          menu: { $push: "$menu" },
          estimatedDeliveryTime: { $push: "$estimatedDeliveryTime" },
        }
      }
    ]);

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        message: ('No menus found with delivery time less', medEstimatedTime)
      });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error in getRestaurantMenusBelowDeliveryTime:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getMenusBelowDeliveryMaxTime = async (req, res) => {
  try {
    const maxEstimatedTime = parseInt(req.query.maxEstimatedTime);

    const menus = await Restaurant.aggregate([
      {
        $unwind: "$estimatedDeliveryTime"
      },
      {
        $match: {
          "estimatedDeliveryTime.maxEstimatedTime": { $lte: maxEstimatedTime }
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          address: { $first: "$address" },
          cuisine: { $first: "$cuisine" },
          menu: { $push: "$menu" },
          estimatedDeliveryTime: { $push: "$estimatedDeliveryTime" },
        }
      }
    ]);

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        message: ('No menus found with delivery time less', maxEstimatedTime)
      });
    }

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error in getRestaurantMenusBelowDeliveryTime:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// end  code 


const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId;

    if (!restaurantId) {
      return res
          .status(400)
          .json({message: 'Restaurant ID parameter is missing'});
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({message: 'Restaurant not found'});
    }

    if (!restaurant.menu || restaurant.menu.length === 0) {
      return res.status(404).json({
        message: 'No menu items found for the specified restaurant',
      });
    }

    const menuItems = restaurant.menu;
    res.status(200).json({menuItem:menuItems});
  } catch (error) {
    console.error('Error in getMenuItemsByRestaurant:', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const getRestaurantDetailsById = async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId;

    if (!restaurantId) {
      return res
          .status(400)
          .json({message: 'Restaurant ID parameter is missing'});
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({message: 'Restaurant not found'});
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error in getRestaurantDetailsById:', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const getRestaurantMenuByCategory = async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId;
    const category = req.query.category;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({message: 'Restaurant not found'});
    }

    const menuItems = restaurant.menu.filter(
        (item) => item.category === category,
    );

    if (menuItems.length === 0) {
      return res.status(404).json({
        message: `No menu items found in the category: ${category}`,
      });
    }

    res.status(200).json({menuItems});// Change status code to 200 for a successful GET request
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
  getRestaurantsByRating,
  getRestaurantMenusByPrice,
  getRestaurantMenusBelowPrice,
  getMenusBelowDeliveryMinTime,
  getMenusBelowDeliveryMedTime,
  getMenusBelowDeliveryMaxTime,
};
