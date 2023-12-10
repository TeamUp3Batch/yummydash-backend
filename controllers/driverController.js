const { Driver } = require('../models/driver')
const { Cart } = require('../models/cart')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Auth Driver & get token
const authDriver = async (req, res) => {
    const { email, password } = req.body
    try {
        const driver = await Driver.findOne({ email })

        if (driver && (await bcrypt.compare(password, driver.password))) {
            const token = jwt.sign(
                { _id: driver._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            )
            // Store driver info in session
            req.session.driver = {
                _id: driver._id,
                firstName: driver.firstName,
                lastName: driver.lastName,
                email: driver.email,
                phoneNumber: driver.phoneNumber,
                ordersDelivered: driver.ordersDelivered,
                rating:driver.userRating,
            }
            req.session.isAuth = true

            res.status(201).json({
                _id: driver._id,
                firstName: driver.firstName,
                lastName: driver.lastName,
                email: driver.email,
                phoneNumber: driver.phoneNumber,
                ordersDelivered: driver.ordersDelivered,
                rating:driver.userRating,
                token,
                status: true,
            })
        } else {
            res.status(401).json({
                message: 'Invalid email or password',
                status: false,
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal Server Error',
            status: false,
        })
    }
}

// Register a new driver

const registerDriver = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    // Checking if any required field is missing
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
        res.status(400).json({
            message: 'All fields are mandatory',
            status: false,
        })
        return
    }

    try {
        // Checking if a driver with the same email already exists
        const driverExists = await Driver.findOne({ email: req.body.email })

        if (driverExists) {
            res.status(400).json({ message: 'Driver details already exist' })
            return
        }

        // Generating a salt and hashing the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(password, salt)

        // Creating a new Driver instance with hashed password
        const newDriver = new Driver({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashPassword,
        })

        // Saving the new driver to the database
        await newDriver.save()

        // Retrieving the newly saved driver
        const newSavedDriver = await Driver.findOne({ email })

        if (newSavedDriver) {
            // Generating a JWT token for authentication
            const token = jwt.sign(
                { _id: newSavedDriver._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d',
                }
            )

            // Storing user information in the session after registration
            req.session.driver = {
                _id: newSavedDriver._id,
                firstName: newSavedDriver.firstName,
                lastName: newSavedDriver.lastName,
                email: newSavedDriver.email,
            }

            req.session.isAuth = true

            // Sending the response with user information and token
            res.status(201).json({
                _id: newSavedDriver._id,
                firstName: newSavedDriver.firstName,
                lastName: newSavedDriver.lastName,
                email: newSavedDriver.email,
                phoneNumber: newSavedDriver.phoneNumber, // Corrected the field name
                token,
                status: true,
            })
        } else {
            res.status(500).json({
                message: 'Error saving new driver',
                status: false,
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const logoutDriver = async (req, res) => {
    delete req.session.driver
    req.session.isAuth = false
    res.status(201).json({
        status: 'logged out',
        token: null,
    })
}

const getOrdersPickedByDriver = async (req, res) => {
    try {
        const driverId = req.query.driverId
        const orderStatus = 'pickup'

        if (!driverId) {
            return res
                .status(400)
                .json({ message: 'driverId parameter is missing' })
        }

        const orderDetails = await Cart.find({
            driverId: driverId,
            orderStatus: orderStatus,
        })

        if (!orderDetails) {
            return res.status(404).json({
                message: 'No Pickup orders for this driver',
                status: false,
            })
        }

        res.status(200).json({ orders: orderDetails, status: true })
    } catch (error) {
        console.error('Error in getting orders picked by driver:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getOrdersCompletedByDriver = async (req, res) => {
    try {
        const driverId = req.query.driverId
        const orderStatus = 'delivery'

        if (!driverId) {
            return res
                .status(400)
                .json({ message: 'driverId parameter is missing' })
        }

        const orderDetails = await Cart.find({
            driverId: driverId,
            orderStatus: orderStatus,
        })

        if (!orderDetails) {
            return res.status(404).json({
                message: 'No Delivery orders for this driver',
                status: false,
            })
        }

        res.status(200).json({ orders: orderDetails, status: true })
    } catch (error) {
        console.error('Error in getting orders delivered by driver:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getDriverProfile = async (req, res) => {
    try {
        const driverId = req.query.driverId

        if (!driverId) {
            return res
                .status(400)
                .json({ message: 'userId parameter is missing' })
        }

        const driverProfile = await Driver.findById(driverId)

        if (!driverProfile) {
            return res.status(404).json({
                message: 'No Profile for this driver',
                status: false,
            })
        }

        res.status(200).json({ driverProfile: driverProfile, status: true })
    } catch (error) {
        console.error('Error in getting profile of driver:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getReadyOrders = async (req, res) => {
    try {
        const orderStatus = 'ready'
        const orderDetails = await Cart.find({
            orderStatus: orderStatus,
        })

        if (!orderDetails) {
            return res.status(404).json({
                message: 'No Ready Orders',
                status: false,
            })
        }

        res.status(200).json({ orders: orderDetails, status: true })
    } catch (error) {
        console.error('Error in getting ready orders:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateOrdersDeliveredByDriver = async (req, res) => {
    try {
        const driverId = req.body.driverId
        const orderStatus = 'delivery'

        if (!driverId) {
            return res
                .status(400)
                .json({ message: 'driverId parameter is missing' })
        }

        const orderDetails = await Cart.find({
            driverId: driverId,
            orderStatus: orderStatus,
        })

        if (!orderDetails) {
            return res.status(404).json({
                message: 'No Delivery orders for this driver',
                status: false,
            })
        }
        const driverProfile = await Driver.findById(driverId)
        const numberOfDeliveries = orderDetails.length
        driverProfile.ordersDelivered = numberOfDeliveries
        await driverProfile.save()

        res.status(200).json({ driverProfile: driverProfile })
    } catch (error) {
        console.error('Error in getting orders delivered by driver:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateDriverRating = async (req, res) => {
    try {
        const driverId = req.body.driverId

        if (!driverId) {
            return res
                .status(400)
                .json({ message: 'driverId parameter is missing' })
        }
        const driverProfile = await Driver.findById(driverId)
        const ratingsByDriver = await Cart.aggregate([
            {
                $match: { driverId: driverId, orderStatus: 'delivery' }, // Match carts for the specific driver and delivery status
            },
            {
                $group: {
                    _id: null,
                    totalCarts: { $sum: 1 }, // Calculate the total number of carts delivered by the driver
                    totalRatings: { $sum: '$driverRating' }, // Calculate the total sum of driver ratings
                },
            },
            {
                $project: {
                    _id: 0,
                    totalCarts: 1,
                    totalRatings: 1,
                    averageRating: {
                        $round: [
                            { $divide: ['$totalRatings', '$totalCarts'] },
                            1,
                        ],
                    }, // Calculate the average rating
                },
            },
        ])

        driverProfile.userRating = ratingsByDriver[0].averageRating
        await driverProfile.save()

        res.status(200).json({ driverProfile: driverProfile })
    } catch (error) {
        console.error('Error in getting orders delivered by driver:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().select('-password')

        if (!drivers || drivers.length === 0) {
            return res.status(404).json({ message: 'No drivers' })
        }

        res.status(200).json(drivers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateDriverDetails = async (req, res) => {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const phoneNumber = req.body.phoneNumber
        const email = req.body.email

        if (!email) {
            return res.status(404).json({ message: 'Missing email' })
        }
        const driver = await Driver.findOne({ email })

        if (!driver) {
            return res.status(404).json({ message: 'No drivers' })
        }

        driver.firstName = firstName
        driver.lastName = lastName
        driver.phoneNumber = phoneNumber

        await driver.save()
        res.status(200).json({ driver: driver })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateDriverProfileByEmail = async (req, res) => {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const phoneNumber = req.body.phoneNumber;
      const email = req.body.email;
  
      if (!firstName ||!lastName || !phoneNumber || !email) {
        return res.status(400).json({message: 'Driver data cannot be missing!'});
      }
  
      const driver = await Driver.findOne({email});
  
      if (!driver) {
        return res.status(404).json({message: 'Driver not found'});
      }
  
      driver.firstName = firstName;
      driver.lastName = lastName;
      driver.phoneNumber = phoneNumber;
  
      await driver.save();
  
      res.status(201).json({ firstName: driver.firstName, lastName : driver.lastName, phoneNumber: driver.phoneNumber });
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  };

module.exports = {
    authDriver,
    registerDriver,
    logoutDriver,
    getOrdersPickedByDriver,
    getOrdersCompletedByDriver,
    getDriverProfile,
    getReadyOrders,
    updateOrdersDeliveredByDriver,
    updateDriverRating,
    getAllDrivers,
    updateDriverDetails,
    updateDriverProfileByEmail
}
