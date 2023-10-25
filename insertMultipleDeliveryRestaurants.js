const mongoose = require('mongoose');
const logger = require('./utils/logger');
// Database connection
mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
    },
);
const {Restaurant} = require('./models/restaurant');

const restaurantId = 'INSERT_RESTAURANT_ID_HERE';

const update = {
  estimatedDeliveryTime: {
    minEstimatedTime: 19, // Update with the desired value
    medEstimatedTime: 38, // Update with the desired value
    maxEstimatedTime: 86, // Update with the desired value
  },
};

// Use findByIdAndUpdate with a promise to update the specific restaurant by ID
Restaurant.findByIdAndUpdate(restaurantId, update, {new: true})
    .then((updatedRestaurant) => {
      console.log('Restaurant updated successfully:', updatedRestaurant);
    })
    .catch((err) => {
      console.error('Error:', err);
    })
    .finally(() => {
    // Close the database connection
      mongoose.connection.close();
    });


