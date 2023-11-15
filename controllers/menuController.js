const {Restaurant} = require('../models/restaurant');

const addMenuItemToRestaurant = async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
      const restaurantId = req.body.restaurantId;
  
      if (!name || !description || !price || !category || !restaurantId) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Create a new menu item
      const newMenuItem = {
        name: name,
        description: description,
        price: price,
        category: category,
      };
  
      // Push the new menu item to the menu array
      restaurant.menu.push(newMenuItem);
  
      await restaurant.save();
  
      res.status(201).json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  const updateMenuItemToRestaurant = async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
      const restaurantId = req.body.restaurantId;
      const menuID = req.body.menuID;
  
      if (!name || !description || !price || !category || !restaurantId || !menuID) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Find the menu item in the menu array based on menuID
      const menuItemToUpdate = restaurant.menu.find(item => item._id.toString() === menuID);
  
      if (!menuItemToUpdate) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      // Update the existing menu item
      menuItemToUpdate.name = name;
      menuItemToUpdate.description = description;
      menuItemToUpdate.price = price;
      menuItemToUpdate.category = category;
  
      await restaurant.save();
  
      res.status(201).json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  const deleteMenuItem = async (req, res) => {
    try {
      const restaurantId = req.body.restaurantId;
      const menuID = req.body.menuID;
  
      if (restaurantId && menuID) {
       
        const result = await Restaurant.findByIdAndUpdate(restaurantId, {
            $pull: { menu: { _id: menuID } },
          },
          { new: true } 
        );
        if (!result) {
          return res.status(404).json({ message: 'Menu item not found' });
        }

      
        //return rest of menuItems
        return res.status(200).json({ message: 'Menu item deleted successfully', status: 'success' , menu : result.menu});

      } else {
        return res.status(400).json({ message: 'Invalid parameters' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  

  module.exports = {

    addMenuItemToRestaurant,
    updateMenuItemToRestaurant,
    deleteMenuItem
    
  };
  
