
const {Cart} = require('../models/cart');
const {Restaurant} = require('../models/restaurant');

const getCartDetailsToCheckout = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const restaurantId = req.body.restaurantId;
    const userId = req.body.userId;

    if (!restaurantId) {
      return res.status(400).json({error: 'restaurantId is required'});
    }

    if (!userId) {
      return res.status(400).json({error: 'UserId is required'});
    }

    if (!cartId) {
      return res.status(400).json({error: 'cartId is required'});
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(400).json({error: ' cart not found '});
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(400).json({error: 'restaurant not found '});
    }

    const checkoutDetails = {
      cartId: cart._id,
      restaurantId: restaurant._id,
      userId: userId,
      restaurantName: restaurant.name,
      totalprice: cart.price,
      lineItems: cart.menuItems,
      estimatedTime: restaurant.estimatedDeliveryTime.minEstimatedTime,
      paymentType: 'CREDIT_CARD', // once map BOX is done we can add address
    };

    res.status(201).json(checkoutDetails);
  } catch (error) {
    console.error('Error in getCartDetailsToCheckout:', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};


module.exports = {
  getCartDetailsToCheckout,
};
