
const {Cart} = require('../models/cart');
const {Restaurant} = require('../models/restaurant');
const {User} = require('../models/user');

const getCartDetailsToCheckout = async (req, res) => {
  console.log("request cartId",req.body.cartId)
  console.log("request restaurantId",req.body.restaurantId)
  console.log("request userId",req.body.userId)
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

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({error: 'restaurant not found '});
    }

    const primaryUserAddress = user.address.find((addr) => addr.isPrimaryAddress);

    const checkoutDetails = {
      cartId: cart._id,
      restaurantId: restaurant._id,
      userId: userId,
      userAddress:primaryUserAddress,
      restaurantName: restaurant.name,
      restaurantAddress: restaurant.address,
      totalprice: cart.price,
      lineItems: cart.menuItems,
      estimatedTime: restaurant.estimatedDeliveryTime.minEstimatedTime,
      paymentType: 'CREDIT_CARD',
      status:"success"
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
