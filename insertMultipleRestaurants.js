
const mongoose = require('mongoose');
  
// Database connection
mongoose.connect('mongodb+srv://teamupcomit:Batch32023@cluster0.yx5dsqh.mongodb.net/yummydash', {
    useNewUrlParser: true,
});
const {Restaurant} = require("./models/restaurant");

Restaurant.insertMany(
[
  {
    "name": "Mamma Mia Trattoria",
    "restaurantImage": "https://example.com/mamma-mia-trattoria.jpg",
    "description": "Savor the delicious flavors of Italy at Mamma Mia Trattoria in San Francisco.",
    "cuisine": "Italian",
    "address": {
      "street": "789 Pasta Avenue",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94104"
    },
    "contact": {
      "phone": "+1-415-555-9876",
      "email": "info@mammamiatrattoria.com",
      "website": "www.mammamiatrattoria.com"
    },
    "menu": [
      {
        "name": "Spaghetti Carbonara",
        "description": "Classic Italian pasta with eggs, cheese, pancetta, and black pepper.",
        "price": 15.99,
        "category": "Pasta"
      },
      {
        "name": "Margherita Pizza",
        "description": "A simple yet delicious pizza with tomato, mozzarella, and basil.",
        "price": 12.99,
        "category": "Pizza"
      },
      {
        "name": "Tiramisu",
        "description": "A classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
        "price": 6.99,
        "category": "Desserts"
      }
    ],
    "ratings": 4.7,
    "reviews": [
      "Authentic Italian taste!",
      "Great atmosphere and friendly staff."
    ],
    "openingHours": {
      "Tuesday": "11:00 AM - 3:00 PM",
      "Thursday": "11:00 AM - 3:00 PM",
      "Friday": "5:00 PM - 10:00 PM",
      "Saturday": "12:00 PM - 10:00 PM",
      "Sunday": "12:00 PM - 8:00 PM"
    }
  }
  
  
  
  
]
  
)
  .then(function () {
    console.log("Restaurant Data inserted"); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });
