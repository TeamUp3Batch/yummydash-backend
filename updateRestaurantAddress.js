const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Database connection
mongoose.connect(
    'mongodb+srv://teamupcomit:Batch32023@cluster0.yx5dsqh.mongodb.net/yummydash',
    {
      useNewUrlParser: true,
    },
);
const {Restaurant} = require('./models/restaurant');
const restaurantId = '651e32d67a5bb9de20aaf7ec'; 

const newAddress = {
  latitude: 51.037978,        
  longitude: -114.07784,      
  address1: '718 17 Ave SW #4, Calgary, AB T2S 0B7, Canada',  
  street: '718 17 Ave SW #4',
  city: 'Calgary',
  province: 'Alberta',
  postalCode: 'AB T2S 0B7',
  country: 'Canada',
};
async function updateRestaurant() {
    try {
      const updatedRestaurant = await Restaurant.findOneAndUpdate(
        { _id: new ObjectId(restaurantId) },
        { $set: { address: newAddress } },
        { new: true }
      );
      console.log('Restaurant with updated address:', updatedRestaurant);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.connection.close(); // Close the MongoDB connection
    }
  }
  
 updateRestaurant();