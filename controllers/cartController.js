const {Cart} = require('../models/cart');
const {Restaurant} = require('../models/restaurant');

const addToCart = async (req, res) => {
  try {
    const restaurantId = req.body.restaurantId;
    const userId = req.body.userId;
    const menuId = req.body.menuId;
    const cartId = req.body.cartId;
    const quantity = parseInt(req.body.quantity) || 1;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({message: 'Restaurant not found'});
    }

    // Find the menu item to add to the cart
    const menuItem = restaurant.menu.id(menuId);

    if (!menuItem) {
      return res.status(404).json({
        message: `No menu items found with ID: ${menuId}`,
      });
    }

    // Find or create a cart based on cartId
    let cart;

    if (cartId) {
      cart = await Cart.findById(cartId);

      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }

      // Check if the item already exists in the cart
      const existingCartItem = cart.menuItems.find(
          (item) => item.itemId === menuId,
      );
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        existingCartItem.price =
                    existingCartItem.quantity * menuItem.price;
        cart.total += quantity * menuItem.price;
        await cart.save();
      } else {
        // If it doesn't exist, add it to the cart
        cart.menuItems.push({
          itemId: menuId,
          name: menuItem.name,
          perPrice: menuItem.price,
          price: menuItem.price * quantity,
          quantity,
        });
        cart.total += quantity * menuItem.price;
        await cart.save();
      }
    } else {
      // Create a new Cart
      cart = new Cart({
        userId,
        restaurantId,
        menuItems: [
          {
            itemId: menuId,
            name: menuItem.name,
            perPrice: menuItem.price,
            price: menuItem.price * quantity,
            quantity,
          },
        ],
        total: menuItem.price * quantity,
      });
    }

    // Save or update the cart in the database
    await cart.save();

    res.status(201).json({cart});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  addToCart,
};
