require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const usersRoutes = require('./routes/usersRoutes')
const authRoutes = require('./routes/authRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const cuisineRoutes = require('./routes/cuisineRoutes')
const cartRoutes = require('./routes/cartRoutes')
const logger = require('./utils/logger')
const session = require('express-session')

// database connection

connectDB()

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
        resave: true,
        saveUninitialized: true,
    })
)

// routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/cuisines', cuisineRoutes)
app.use('/api/cart', cartRoutes)

// testing route
app.get('/test', (req, res) => {
    res.send('Hello')
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})
