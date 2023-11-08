const mongoose = require('mongoose');

// Database connection
mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
    },
);
const {Restaurant} = require('./models/restaurant');
const restaurantId = '651a4f25a576f4480579c02d'; // Replace with the actual ID you want to delete the address for

Restaurant.findOneAndUpdate(
  { _id: ObjectId(restaurantId) },
  { $unset: { address: 1 } }, // Use $unset to remove the "address" field
  { new: true },
  (err, updatedRestaurant) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Address field deleted:', updatedRestaurant);
    }
    mongoose.connection.close(); // Close the MongoDB connection
  }
);

