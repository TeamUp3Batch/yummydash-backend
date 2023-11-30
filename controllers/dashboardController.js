const { Driver } = require('../models/driver')
const { Cart } = require('../models/cart')
const { Restaurant } = require('../models/restaurant')
const { User } = require('../models/user')

const getTotalDrivers = async (req, res) => {
    try {
        const count = await Driver.countDocuments()

        if (count === 0) {
            return res.status(404).json({ message: 'No drivers' })
        }

        res.status(200).json({ totalDrivers: count })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getTotalRestaurants = async (req, res) => {
    try {
        const count = await Restaurant.countDocuments()

        if (count === 0) {
            return res.status(404).json({ message: 'No restaurants' })
        }

        res.status(200).json({ totalRestaurants: count })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getTotalUsers = async (req, res) => {
    try {
        const count = await User.countDocuments()

        if (count === 0) {
            return res.status(404).json({ message: 'No users' })
        }

        res.status(200).json({ totalUsers: count })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getTotalOrdersDelivered = async (req, res) => {
    try {
        const count = await Cart.countDocuments({ orderStatus: 'delivery' })

        if (count === 0) {
            return res.status(404).json({ message: 'No orders delivered' })
        }

        res.status(200).json({ OrdersDelivered: count })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getTopPerformingRestaurant = async (req, res) => {
    const topPerformingRestaurant = await Cart.aggregate([
        {
            $match: {
                orderStatus: 'delivery',
            },
        },
        {
            $group: {
                _id: '$restaurantId',
                restaurantName: { $first: '$restaurantName' },
                totalOrders: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                restaurantId: '$_id',
                restaurantName: 1,
                totalOrders: 1,
            },
        },
        {
            $sort: { totalOrders: -1 },
        },
        {
            $limit: 1,
        },
    ])
    res.send({ topRestaurant: topPerformingRestaurant })
}

const getTopPerformingDriver = async (req, res) => {
    const topPerformingDriver = await Driver.aggregate([
        {
            $sort: { ordersDelivered: -1 },
        },
        {
            $limit: 1,
        },
        {
            $project: {
                password: 0
            },
        },
    ])
    res.send({ topDriver: topPerformingDriver })
}

const getSalesPerWeek = async (req, res) => {
    const salesPerWeek = await Cart.aggregate([
    {
        $match: {
          orderStatus: "delivery" // Filter documents where orderStatus is "delivery"
        }
      },
      {
        $group: {
          _id: { $week: { $toDate: "$cartCreationTime" } },
          totalSales: { $sum: "$total" }
        }
      },
      {
        $project: {
          _id: 1,
          totalSales: { $round: ["$totalSales", 2] }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);
    res.send({ weeklySales: salesPerWeek })
}

const getSalesPerMonth = async (req, res) => {
    const salesPerMonth = await Cart.aggregate([
    {
        $match: {
          orderStatus: "delivery" // Filter documents where orderStatus is "delivery"
        }
      },
      {
        $group: {
          _id: { $month: { $toDate: "$cartCreationTime" } },
          totalSales: { $sum: "$total" }
        }
      },
      {
        $project: {
          _id: 1,
          totalSales: { $round: ["$totalSales", 2] }
        }
      },
      {
        $sort: { "_id": 1 } 
      }
    ]);
    res.send({ monthlySales: salesPerMonth })
}




module.exports = {
    getTopPerformingDriver,
    getTopPerformingRestaurant,
    getTotalDrivers,
    getTotalRestaurants,
    getTotalUsers,
    getTotalOrdersDelivered,
    getSalesPerWeek,
    getSalesPerMonth
}
