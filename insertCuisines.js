const mongoose = require('mongoose');
const logger = require('./utils/logger');

// Database connection
mongoose.connect(
    'mongodb+srv://teamupcomit:Batch32023@cluster0.yx5dsqh.mongodb.net/yummydash',
    {
      useNewUrlParser: true,
    },
);
const {Cuisine} = require('./models/cuisine');

Cuisine.insertMany([
  {
    name: 'Arabic',
    imageUrl:
            'https://media.istockphoto.com/id/868945844/photo/middle-eastern-traditional-dinner-authentic-arab-cuisine-meze-party-food-top-view-flat-lay.webp?b=1&s=170667a&w=0&k=20&c=YOlXITDu4OSVdWAjB1c6xIcYH84YN0CyV_diKSk40Nw=',
  },
  {
    name: 'Chinese',
    imageUrl:
            'https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENoaW5lc2UlMjBGb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Japanese',
    imageUrl:
            'https://images.unsplash.com/photo-1629684782790-385ed5adb497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEphcGFuZXNlJTIwRm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Korean',
    imageUrl:
            'https://images.unsplash.com/photo-1567533708067-239a2371890b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEtvcmVhbiUyMEZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Russian',
    imageUrl:
            'https://media.istockphoto.com/id/486978329/photo/homemade-polish-pierogis-with-sour-cream.webp?b=1&s=170667a&w=0&k=20&c=N8zBdR6dLjT7_CE5MkptsTjG-PhOeTPxSMezslswAzY=',
  },
  {
    name: 'African',
    imageUrl:
            'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'Italian',
    imageUrl:
            'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SXRhbGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Indian',
    imageUrl:
            'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvc2ElMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Caribbean',
    imageUrl:
            'https://static9.depositphotos.com/1354142/1134/i/450/depositphotos_11343489-stock-photo-jerk-chicken-plate.jpg',
  },
  {
    name: 'Thai',
    imageUrl:
            'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Vietnamese',
    imageUrl:
            'https://img.freepik.com/free-photo/delicious-vietnamese-food-including-pho-ga-noodles-spring-rolls-white-wall_181624-34158.jpg',
  },
  {
    name: 'Bangaldeshi',
    imageUrl:
            'https://img.freepik.com/free-photo/gourmet-bowl-with-healthy-rice-meat-vegetables-generated-by-ai_188544-14076.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696464000&semt=ais',
  },
  {
    name: 'Vegan',
    imageUrl:
            'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyaWJiZWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Mexican',
    imageUrl:
            'https://images.unsplash.com/photo-1625166913168-9135c6ffddcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1leGljYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Healthy',
    imageUrl:
            'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Pizza',
    imageUrl:
            'https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Vegeterian',
    imageUrl:
            'https://media.istockphoto.com/id/638000936/photo/vegan-and-vegetarian-indian-cuisine-hot-spicy-dishes.jpg?s=612x612&w=0&k=20&c=ISxBGeKALq9c11v05BbNw2XtRzQaGn4BddU8BHF9ANk=',
  },
])
    .then(function() {
      logger.info('Cuisine Data inserted'); // Success
    })
    .catch(function(error) {
      logger.info(error); // Failure
    });
