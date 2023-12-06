require('dotenv').config()
const express = require('express')
const app = express()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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
const menuRoutes = require('./routes/menuRoutes')
const driverRoutes = require('./routes/driverRoutes')
const partnerRoutes = require('./routes/partnerRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const adminRoutes = require('./routes/adminRoutes')

// database connection

connectDB()

// middlewares

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'YummyDash API Documentation',
      version: '1.0.0',
      description: 'API documentation Yummydash',
    contact: {
      name:'ComIT Teamup Batch 3',
      email:'teamupcomit@gmail.com'
    }
    },
    servers: [
      {
        url: 'http://localhost:5000', // Change this to your server URL
        description: 'API application for YummyDash-an online food ordering website',
      },
    ],
  },
  apis: ['./routes/*.js','./routes/adminRoutes.js'], // Path to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
app.use('/api/menu', menuRoutes)
app.use('/api/driver', driverRoutes)
app.use('/api/partner', partnerRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/admin', adminRoutes)

// testing route
app.get('/test', (req, res) => {
    res.send('Hello')
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})
