const {TestingRestaurant} = require("../models/testingrestaurant");
const upload = require('./../helpers/multerHelper');

// Controller function to get all restaurants in an area

const insertNewTestRestaurant = async(req,res) =>{
    console.log("inserting...............")
    try{
        console.log("trying.....")
        const newRestaurant = new TestingRestaurant({
            name: req.body.name,
            description: req.body.description,
            cuisine: req.body.cuisine,
            address: req.body.address,
            contact: req.body.contact,
            menu:req.body.menu,
            ratings: req.body.ratings,
            reviews: req.body.reviews,
            openingHours: req.body.openingHours,
            restaurantImage:req.body.restaurantImage
          });
      
    await newRestaurant.save();
    res.send({"savedRestaurant":newRestaurant}); 
    
}
    catch(error){
        console.log(error);
        res.send(500).json({ message: 'Internal Server Error' });
    }
}
const getAllTestRestaurants = async (req, res) => {
  try {
    // You can filter restaurants based on the area (location) here
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTestRestaurantsByCuisine = async(req,res)=>{
    try{
        const byCuisine = await Restaurant.find({cuisine:req.body.cuisine})
        res.json(byCuisine);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const uploadTestRestaurantImage = async(req,res) =>{
    try{

        let restaurant = await Restaurant.findOne({ name: req.body.restaurantName });
        if(restaurant){

            const updateResult = await restaurant.updateOne({
                name:req.body.restaurantName
            },{
                $set: {
                    restaurantImage:req.file.buffer, // Replace with your new image object
                  }
            });
            console.log("updateResult",updateResult)
            if (updateResult.matchedCount === 1) {
                console.log("sucessssssssssssssss")
               res.send({message:"Restaurant image updated successfully."});
              } else {
                console.log("FAILED!")
                // No document was matched for update
                res.send({message:"Restaurant not found."});
              }
        }
        else{
            res.send({message:"no restauarant found with given name"})
        }

    }
    catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
}

// const uploadMenuImage = async(req,res){
//     try{}
//     catch{}
// }

module.exports = {
  getAllTestRestaurants,
  getTestRestaurantsByCuisine,
  uploadTestRestaurantImage,
  insertNewTestRestaurant
};