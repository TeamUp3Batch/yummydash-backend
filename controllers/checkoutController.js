// cart- id cart detials -> 
//find the estimate formt the restaurant 
//using the (req and body )restaurant id ,cart id
//


const getCartDetailsToCheckout = async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const restaurantId = req.body.restaurantId;
    console.log('cartId', cartId);
    console.log('restaurantId', restaurantId);

    // if (!restaurantId) {
    //   return res.status(404).json({message: 'Restaurant not found'});
    // }

    // if (!cartId) {
    //   return res.status(404).json({message: 'Cart not found'});
    // }

    res.status(200).json({message: 'success'});
  } catch (error) {
    console.error('Error in getCartDetails:', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};


module.exports = {
  getCartDetailsToCheckout,
};
