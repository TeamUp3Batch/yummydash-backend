require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const cuisineRoutes = require('./routes/cuisineRoutes');
const logger = require('./utils/logger');
const cookieSession = require('cookie-session');

// database connection

connectDB();

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(
    cookieSession({
      name: 'session', // Name of the cookie
      keys: process.env.COOKIE_SESSION,
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
      secure: false, // Set to true for HTTPS (false)
    }),
);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/cuisines', cuisineRoutes);



// testing route
app.get('/test', (req, res) => {
  res.send('Hello');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
