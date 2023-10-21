const {Cart} = require('../models/cart');

const addToCart = async (req, res) => {
    try {
        const restaurantId = req.body.restaurantId
        const userId = req.body.userId
        const menuId = req.body.menuId
        const cartId = req.body.cartId


        const restaurant = await Restaurant.findById(restaurantId)

       
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}