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

      // Check if the item already exists in the cart
      const existingCartItem = cart.menuItems.find(
          (item) => item.itemId === menuId,
      );
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        existingCartItem.price =
                    existingCartItem.quantity * menuItem.price;
        cart.total += quantity * menuItem.price;
        cart.total = parseFloat(cart.total.toFixed(2));
        await cart.save();
      } else {
        // If it doesn't exist, add it to the cart
        cart.menuItems.push({
          itemId: menuId,
          name: menuItem.name,
          perPrice: menuItem.price,
          price: parseFloat((menuItem.price * quantity).toFixed(2)),
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

const removeFromCart = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const quantity = parseInt(req.body.quantity) || 1;
    const menuId = req.body.menuId;
    if (cartId) {
      cart = await Cart.findById(cartId);
      // remove the cartItems

      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }

      // decrease the quantity of the cart menu item
      const existingCartItem = cart.menuItems.find(
          (item) => item.itemId === menuId,
      );

      if (existingCartItem) {
        if (
          existingCartItem.quantity > 1 &&
                    existingCartItem.quantity != quantity
        ) {
          existingCartItem.quantity -= quantity;
          existingCartItem.price =
                        existingCartItem.quantity * existingCartItem.perPrice;
          existingCartItem.price = parseFloat(
              existingCartItem.price.toFixed(2),
          );
          cart.total = parseFloat(
              (
                cart.total -
                            quantity * existingCartItem.perPrice

              ).toFixed(2),
          );
          await cart.save();
          res.status(201).json(cart);
        }

        if (existingCartItem.quantity == quantity) {
          // remove the menuItem if item quantity is 1
          const deletedCartItem = cart.menuItems.find(
              (item) => item.itemId === menuId,
          );
          const deletedCartItemPrice = deletedCartItem.price;

          const updatedCart = await Cart.findByIdAndUpdate(
              cartId,
              {
                $pull: {menuItems: {itemId: menuId}},
              },
              {new: true},
          );
          // check if the cart becomes empty,if then delete the document
          if (updatedCart.menuItems.length == 0) {
            await Cart.findByIdAndDelete(cartId);
            res.status(201).json({message: 'cart deleted'});
          }
          // update the price when the item is removed
          updatedCart.total = updatedCart.total - deletedCartItemPrice;
          await updatedCart.save();
          res.status(201).json(updatedCart);

          if (!updatedCart) {
            return res
                .status(404)
                .json({message: 'Cart item not found'});
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};
const updateCart = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const menuId = req.body.menuId;
    const quantity = parseInt(req.body.quantity) || 1;
    const userId = req.body.userId;


    if (cartId) {
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }

      const existingCartItem = cart.menuItems.find(
          (item) => item.itemId === menuId,
      );

      if (quantity > 0) {
        if (existingCartItem) {
          // Update item quantity and price
          existingCartItem.quantity = quantity;
          existingCartItem.price =
                        existingCartItem.quantity * existingCartItem.perPrice;
          existingCartItem.price = parseFloat(
              existingCartItem.price.toFixed(2),
          );
        } else {
          // Add a new item to the cart
          const restaurantId = req.body.restaurantId;
          const restaurant = await Restaurant.findById(restaurantId);

          if (!restaurant) {
            return res
                .status(404)
                .json({message: 'Restaurant not found'});
          }

          const menuItem = restaurant.menu.id(menuId);

          if (!menuItem) {
            return res
                .status(404)
                .json({
                  message: `No menu items found with ID: ${menuId}`,
                });
          }

          cart.menuItems.push({
            itemId: menuId,
            name: menuItem.name,
            perPrice: menuItem.price,
            price: menuItem.price * quantity,
            quantity,
          });
        }

        // Update cart total
        cart.total = cart.menuItems.reduce(
            (total, item) => total + item.quantity * item.perPrice,
            0,
        );
        cart.total = parseFloat(cart.total.toFixed(2));

        await cart.save();
        res.status(201).json(cart);
      } else {
        // If quantity is 0 or negative, remove the item from the cart
        if (existingCartItem) {
          cart.menuItems = cart.menuItems.filter(
              (item) => item.itemId !== menuId,
          );

          // Update cart total
          cart.total = cart.menuItems.reduce(
              (total, item) => total + item.quantity * item.perPrice,
              0,
          );
          cart.total = parseFloat(cart.total.toFixed(2));

          await cart.save();
          res.status(201).json(cart);
        } else {
          res.status(404).json({
            message: 'Item not found in the cart',
          });
        }
      }
    } else {
      // Create a new Cart
      const restaurantId = req.body.restaurantId;
      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) {
        return res.status(404).json({message: 'Restaurant not found'});
      }

      const menuItem = restaurant.menu.id(menuId);

      if (!menuItem) {
        return res
            .status(404)
            .json({message: `No menu items found with ID: ${menuId}`});
      }

      const newCart = new Cart({
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

      await newCart.save();
      res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const removeItemOrRemoveCart = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const menuId = req.body.menuId;

    if (!cartId) {
      return res.status(400).json({message: 'Cart ID is required'});
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({message: 'Cart not found'});
    }

    if (menuId && cart.menuItems.length > 1) {
      // Remove a menu item from the cart
      const removedMenuItemIndex = cart.menuItems.findIndex(
          (item) => item.itemId === menuId,
      );

      if (removedMenuItemIndex !== -1) {
        const removedMenuItem = cart.menuItems[removedMenuItemIndex];
        cart.menuItems.splice(removedMenuItemIndex, 1);
        cart.total -= removedMenuItem.price;
        cart.total = parseFloat(cart.total.toFixed(2));
      }

      await cart.save();
      return res
          .status(201)
          .json({message: 'Menu item removed from cart', cart: cart});
    } else {
      // Delete the entire cart if the length of menuItems is 1
      if (cart.menuItems.length === 1) {
        await Cart.findByIdAndDelete(cartId);
        return res.status(201).json({message: 'Cart deleted'});
      } else {
        return res.status(400).json({
          message: 'Cart is not eligible for deletion',
          cart: cart,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    if (cartId) {
      cart = await Cart.findById(cartId);

      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }
      await Cart.findByIdAndRemove(cartId);

      return res
          .status(200)
          .json({message: 'Cart deleted successfully', status: 'success'});
    } else {
      return res.status(400).json({message: 'Invalid cart ID'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  deleteCart,
  removeItemOrRemoveCart,
  updateCart,
};

