
const mongoose = require('mongoose');
  
// Database connection
mongoose.connect('mongodb+srv://teamupcomit:Batch32023@cluster0.yx5dsqh.mongodb.net/yummydash', {
    useNewUrlParser: true,
});
const {Restaurant} = require("./models/restaurant");

Restaurant.insertMany([
    {
      name: "Dhaka Spice House",
      description: "Authentic Bangladeshi flavors in the heart of Toronto.",
      cuisine: "Bangladeshi",
      address: {
        street: "45 Curry Lane",
        city: "Toronto",
        state: "Ontario",
        postalCode: "M4B 1A1",
      },
      contact: {
        phone: "+1-416-987-6543",
        email: "info@dhakaspicehouse.com",
        website: "www.dhakaspicehouse.com",
      },
      menu: [
        {
          name: "Biryani",
          description: "Fragrant rice dish with flavorful spices and meat.",
          price: 12.99,
          category: "Main Course",
        },
        {
          name: "Hilsa Fish Curry",
          description: "Delicate fish curry with mustard seeds and spices.",
          price: 14.99,
          category: "Main Course",
        },
        {
          name: "Rasgulla",
          description: "Sweet and spongy Bangladeshi dessert.",
          price: 6.99,
          category: "Dessert",
        },
      ],
      ratings: 4.7,
      reviews: ["Best Bangladeshi cuisine!", "Warm atmosphere."],
      openingHours: {
        Wednesday: "11:00 AM - 9:00 PM",
        Friday: "11:00 AM - 9:00 PM",
      },
    },
    {
      name: "Sylhet Spice",
      description: "Sylheti dishes served with a contemporary twist in Vancouver.",
      cuisine: "Bangladeshi",
      address: {
        street: "67 Sylhet Road",
        city: "Vancouver",
        state: "British Columbia",
        postalCode: "V6C 2T5",
      },
      contact: {
        phone: "+1-604-876-5432",
        email: "info@sylhetspice.com",
        website: "www.sylhetspice.com",
      },
      menu: [
        {
          name: "Pitha",
          description: "Traditional rice cakes with various fillings.",
          price: 8.99,
          category: "Appetizer",
        },
        {
          name: "Shatkora Beef Curry",
          description: "Spicy beef curry with tangy shatkora fruit.",
          price: 16.99,
          category: "Main Course",
        },
        {
          name: "Misti Doi",
          description: "Creamy Bangladeshi sweet yogurt.",
          price: 4.99,
          category: "Dessert",
        },
      ],
      ratings: 4.8,
      reviews: ["Delightful Sylheti cuisine!", "Excellent service."],
      openingHours: {
        Monday: "12:00 PM - 10:00 PM",
        Saturday: "12:00 PM - 10:00 PM",
      },
    },
    {
      name: "Deshi Delights",
      description: "Bangladeshi street food in Mississauga.",
      cuisine: "Bangladeshi",
      address: {
        street: "123 Spices Avenue",
        city: "Mississauga",
        state: "Ontario",
        postalCode: "L5N 1A1",
      },
      contact: {
        phone: "+1-905-765-4321",
        email: "info@deshidelights.ca",
        website: "www.deshidelights.ca",
      },
      menu: [
        {
          name: "Fuska",
          description: "Crispy snacks filled with spicy potato mix.",
          price: 5.99,
          category: "Appetizer",
        },
        {
          name: "Kacchi Biriyani",
          description: "Traditional Bangladeshi biryani with marinated meat.",
          price: 13.99,
          category: "Main Course",
        },
        {
          name: "Mango Lassi",
          description: "Refreshing mango yogurt drink.",
          price: 4.99,
          category: "Beverage",
        },
      ],
      ratings: 4.5,
      reviews: ["Amazing Bangladeshi street food!", "Friendly staff."],
      openingHours: {
        Tuesday: "11:00 AM - 8:00 PM",
        Thursday: "11:00 AM - 8:00 PM",
      },
    },
    {
      name: "Chittagong Flavors",
      description: "Chittagonian specialties in Edmonton.",
      cuisine: "Bangladeshi",
      address: {
        street: "789 Seafood Drive",
        city: "Edmonton",
        state: "Alberta",
        postalCode: "T5J 2N5",
      },
      contact: {
        phone: "+1-780-987-6543",
        email: "info@chittagongflavors.com",
        website: "www.chittagongflavors.com",
      },
      menu: [
        {
          name: "Mezban Beef Curry",
          description: "Spicy beef curry with aromatic spices.",
          price: 15.99,
          category: "Main Course",
        },
        {
          name: "Kala Bhuna",
          description: "Black spicy curry with marinated meat.",
          price: 14.99,
          category: "Main Course",
        },
        {
          name: "Rasgulla",
          description: "Sweet Bangladeshi dessert.",
          price: 6.99,
          category: "Dessert",
        },
      ],
      ratings: 4.6,
      reviews: ["Delicious Chittagonian dishes!", "Cozy atmosphere."],
      openingHours: {
        Monday: "12:00 PM - 9:00 PM",
        Wednesday: "12:00 PM - 9:00 PM",
      },
    },
    {
      name: "Rajshahi Kitchen",
      description: "Taste the flavors of Rajshahi in Calgary.",
      cuisine: "Bangladeshi",
      address: {
        street: "321 Mango Avenue",
        city: "Calgary",
        state: "Alberta",
        postalCode: "T2G 3T5",
      },
      contact: {
        phone: "+1-403-876-5432",
        email: "info@rajshahikitchen.ca",
        website: "www.rajshahikitchen.ca",
      },
      menu: [
        {
          name: "Polao",
          description: "Aromatic rice dish with marinated meat.",
          price: 14.99,
          category: "Main Course",
        },
        {
          name: "Shorshe Ilish",
          description: "Hilsa fish in a tangy mustard sauce.",
          price: 18.99,
          category: "Main Course",
        },
        {
          name: "Rasmalai",
          description: "Delicate Bengali dessert with saffron.",
          price: 7.99,
          category: "Dessert",
        },
      ],
      ratings: 4.7,
      reviews: ["Rajshahi's finest cuisine!", "Friendly service."],
      openingHours: {
        Tuesday: "11:00 AM - 9:00 PM",
        Thursday: "11:00 AM - 9:00 PM",
      },
    },
  ])
  .then(function () {
    console.log("Restaurant Data inserted"); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });
