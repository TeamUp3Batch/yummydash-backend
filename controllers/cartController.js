const { Cart } = require('../models/cart')
const { Restaurant } = require('../models/restaurant')
const { User } = require('../models/user')
const { Driver } = require('../models/driver')

const updateCart = async (req, res) => {
    try {
        const cartId = req.body.cartId
        const menuId = req.body.menuId
        const quantity = parseInt(req.body.quantity) || 1
        const userId = req.body.userId

        if (cartId) {
            const cart = await Cart.findById(cartId)

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }

            const existingCartItem = cart.menuItems.find(
                (item) => item.itemId === menuId
            )

            if (quantity > 0) {
                if (existingCartItem) {
                    // Update item quantity and price
                    existingCartItem.quantity = quantity
                    existingCartItem.price =
                        existingCartItem.quantity * existingCartItem.perPrice
                    existingCartItem.price = parseFloat(
                        existingCartItem.price.toFixed(2)
                    )
                } else {
                    // Add a new item to the cart
                    const restaurantId = req.body.restaurantId
                    const restaurant = await Restaurant.findById(restaurantId)

                    if (!restaurant) {
                        return res
                            .status(404)
                            .json({ message: 'Restaurant not found' })
                    }

                    const menuItem = restaurant.menu.id(menuId)

                    if (!menuItem) {
                        return res.status(404).json({
                            message: `No menu items found with ID: ${menuId}`,
                        })
                    }

                    cart.menuItems.push({
                        itemId: menuId,
                        name: menuItem.name,
                        perPrice: menuItem.price,
                        price: menuItem.price * quantity,
                        quantity,
                    })
                }

                // Update cart total
                cart.total = cart.menuItems.reduce(
                    (total, item) => total + item.quantity * item.perPrice,
                    0
                )
                cart.total = parseFloat(cart.total.toFixed(2))

                await cart.save()
                res.status(201).json(cart)
            } else {
                // If quantity is 0 or negative, remove the item from the cart
                if (existingCartItem) {
                    cart.menuItems = cart.menuItems.filter(
                        (item) => item.itemId !== menuId
                    )

                    // Update cart total
                    cart.total = cart.menuItems.reduce(
                        (total, item) => total + item.quantity * item.perPrice,
                        0
                    )
                    cart.total = parseFloat(cart.total.toFixed(2))

                    await cart.save()
                    res.status(201).json(cart)
                } else {
                    res.status(404).json({
                        message: 'Item not found in the cart',
                    })
                }
            }
        } else {
            // Create a new Cart
            const restaurantId = req.body.restaurantId
            const restaurant = await Restaurant.findById(restaurantId)

            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' })
            }

            const menuItem = restaurant.menu.id(menuId)

            if (!menuItem) {
                return res
                    .status(404)
                    .json({ message: `No menu items found with ID: ${menuId}` })
            }
            //find user name and contact
            const user = await User.findById(userId)
            const userFullName = user.firstName + ' ' + user.lastName
            const userPhone = user.phoneNumber
            const primaryAddress = user.address.find(
                (addres) => addres.isPrimaryAddress === true
            )
            const userAddress = primaryAddress.userAddress1
            const restaurantAddress = restaurant.address.address1
            const restaurantName = restaurant.name
            const newCart = new Cart({
                userId,
                restaurantId,
                userName: userFullName,
                userContact: userPhone,
                userAddress: userAddress,
                restaurantAddress: restaurantAddress,
                restaurantName: restaurantName,
                
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
            })

            newCart.orderTracker['initial'] = {
                timestamp: Date.now(),
                status: true,
            }
            await newCart.save()
            res.status(201).json(newCart)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const removeItemOrRemoveCart = async (req, res) => {
    try {
        const cartId = req.body.cartId
        const menuId = req.body.menuId

        if (!cartId) {
            return res.status(400).json({ message: 'Cart ID is required' })
        }

        const cart = await Cart.findById(cartId)

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        if (menuId && cart.menuItems.length > 1) {
            // Remove a menu item from the cart
            const removedMenuItemIndex = cart.menuItems.findIndex(
                (item) => item.itemId === menuId
            )

            if (removedMenuItemIndex !== -1) {
                const removedMenuItem = cart.menuItems[removedMenuItemIndex]
                cart.menuItems.splice(removedMenuItemIndex, 1)
                cart.total -= removedMenuItem.price
                cart.total = parseFloat(cart.total.toFixed(2))
            }

            await cart.save()
            return res
                .status(201)
                .json({ message: 'Menu item removed from cart', cart: cart })
        } else {
            // Delete the entire cart if the length of menuItems is 1
            if (cart.menuItems.length === 1) {
                await Cart.findByIdAndDelete(cartId)
                return res.status(201).json({ message: 'Cart deleted' })
            } else {
                return res.status(400).json({
                    message: 'Cart is not eligible for deletion',
                    cart: cart,
                })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteCart = async (req, res) => {
    try {
        const cartId = req.body.cartId
        if (cartId) {
            cart = await Cart.findById(cartId)

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' })
            }
            await Cart.findByIdAndRemove(cartId)

            return res.status(200).json({
                message: 'Cart deleted successfully',
                status: 'success',
            })
        } else {
            return res.status(400).json({ message: 'Invalid cart ID' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const cartID = req.body.cartId
        const restaurantId = req.body.restaurantId
        const userID = req.body.userId
        const newOrderStatus = req.body.newOrderStatus

        if (!cartID || !restaurantId || !userID || !newOrderStatus) {
            return res
                .status(400)
                .json({ message: 'Missing required parameters' })
        }

        const cart = await Cart.findOne({
            _id: cartID,
            restaurantId,
            userId: userID,
        })

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        // Update only the order status
        //added tracker
        if (typeof newOrderStatus === 'string' && newOrderStatus === 'pickup') {
            
            if (req.body.driverId !== null) {
                cart.driverId = req.body.driverId;
            }
        }
        if (typeof newOrderStatus === 'string' && newOrderStatus === 'delivery') {
            
            if (req.body.driverId !== null) {
                const driverProfile = await Driver.findById(req.body.driverId)
                driverProfile.ordersDelivered += 1;
                await driverProfile.save()


            }
        }
        cart.orderStatus = newOrderStatus
        cart.orderTracker[newOrderStatus] = {
            timestamp: Date.now(),
            status: true,
        }

        await cart.save()

        res.status(201).json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getPendingOrdersByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.query.restaurantId

        if (!restaurantId) {
            return res
                .status(400)
                .json({ message: 'Restaurant ID parameter is missing' })
        }

        const pendingOrders = await Cart.find({
            restaurantId: restaurantId,
            orderStatus: 'payment',
        })

        if (!pendingOrders || pendingOrders.length === 0) {
            return res.status(404).json({ message: 'No pending orders found' })
        }

        res.status(200).json(pendingOrders)
    } catch (error) {
        console.error('Error in getPendingOrdersByRestaurantId:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getAllOrdersByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.query.restaurantId

        if (!restaurantId) {
            return res
                .status(400)
                .json({ message: 'RestaurantID parameter is missing' })
        }

        const AllOrders = await Cart.find({
            restaurantId: restaurantId,
        })

        if (!AllOrders || AllOrders.length === 0) {
            return res.status(404).json({ message: 'No pending orders found' })
        }

        res.status(200).json(AllOrders)
    } catch (error) {
        console.error('Error in getAllOrdersByRestaurantId:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getAllOrdersByUserId = async (req, res) => {
    try {
        const userId = req.query.userId

        if (!userId) {
            return res
                .status(400)
                .json({ message: 'userID parameter is missing' })
        }

        const AllOrders = await Cart.find({
            userId: userId,
        })

        if (!AllOrders || AllOrders.length === 0) {
            return res.status(404).json({ message: 'No pending orders found' })
        }

        res.status(200).json(AllOrders)
    } catch (error) {
        console.error('Error in getAllOrdersByUserId:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const userId = req.query.userId
        const cartId = req.query.cartId

        if (!userId || !cartId) {
            return res
                .status(400)
                .json({ message: 'userID or cartID parameter is missing' })
        }

        const orderDetails = await Cart.findOne({
            userId: userId,
            _id: cartId,
        })

        if (!orderDetails) {
            return res.status(404).json({ message: 'Order not found' })
        }

        res.status(200).json(orderDetails)
    } catch (error) {
        console.error('Error in getSingleOrderDetails:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
};


const updateDriverRatingByUser = async (req, res) => {
    try {
        const { cartId, userId, driverId, driverRating } = req.body;

        // Check for missing required parameters
        if (!cartId || !userId || !driverId ||!driverRating ) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        // Find the cart based on cartId and userId
        const cart = await Cart.findOne({
            _id: cartId,
            userId: userId,
        });

        // Return 404 if cart is not found
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update driverId and driverRating if orderStatus is 'delivery'
        if (cart.orderStatus === 'delivery' && cart.driverId !== null) {
            cart.driverRating = driverRating;
            await cart.save();
        } else {
          
            return res.status(400).json({ message: 'Invalid orderStatus or missing driverId' });
        }

        // Return the updated cart in the response
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateRestaurantRatingByUser = async (req, res) => {
    try {
        const { cartId,userId, restaurantId, restaurantRating } = req.body;

        // Check for missing required parameters
        if (!cartId || !userId || !restaurantId ||!restaurantRating ) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        // Find the cart based on cartId and userId
        const cart = await Cart.findOne({
            _id: cartId, 
            userId: userId,
            restaurantId: restaurantId,
        });

        // Return 404 if cart is not found
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Update driverId and driverRating if orderStatus is 'delivery'
        if (cart.orderStatus === 'delivery' && cart.restaurantId !== null) {
            cart.restaurantRating = restaurantRating;
            await cart.save();
        } else {
          
            return res.status(400).json({ message: 'Invalid orderStatus or missing driverId' });
        }

        // Return the updated cart in the response
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    deleteCart,
    removeItemOrRemoveCart,
    updateCart,
    updateOrderStatus,
    getPendingOrdersByRestaurantId,
    getAllOrdersByUserId,
    getAllOrdersByRestaurantId,
    getOrderDetailsByOrderId,
    updateDriverRatingByUser,
    updateRestaurantRatingByUser
}
