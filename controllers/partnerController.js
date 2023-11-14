const {Partner} = require('../models/partner');
const {Restaurant} = require('../models/restaurant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Partner partner & get token
const authPartner = async (req, res) => {
    const {email, password} = req.body;
    try {
      const partner = await Partner.findOne({email});
  
      if (partner && (await bcrypt.compare(password, partner.password))) {
        const token = jwt.sign({_id: partner._id}, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        // Store partner info in session
        req.session.partner = {
          _id: partner._id,
          name: partner.name,
          email: partner.email,
          phoneNumber: partner.phoneNumber,
 
        };
        req.session.isAuth = true;
  
        res.status(201).json({
          _id: partner._id,
          name: partner.name,
          email: partner.email,
          phoneNumber: partner.phoneNumber,
          restaurantId: partner.restaurantId,     
          token,
          status: true,
        });
      } else {
        res.status(401).json({
          message: 'Invalid email or password',
          status: false,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
        status: false,
      });
    }
  };





// Register a new partner

const registerPartner = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
  
    // Checking if any required field is missing
    if (!name || !email || !phoneNumber || !password) {
      res.status(400).json({ message: 'All fields are mandatory', status: false });
      return;
    }
  
    try {
      // Checking if a partner with the same email already exists
      const partnerExists = await Partner.findOne({ email });
  
      if (partnerExists) {
        res.status(400).json({ message: 'Partner details already exist', status: false });
        return;
      }
  
      // Checking if a restaurant with the same email already exists
      const existingRestaurant = await Restaurant.findOne({ 'contact.email': email });
  
      if (existingRestaurant) {
        // Email exists in restaurant contact, get restaurant details
        const restaurantId = existingRestaurant._id;
  
        // Generating a salt and hashing the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
  
        // Update restaurantId in the partner model
        const partner = new Partner({
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
          phoneNumber: req.body.phoneNumber,
          restaurantId: restaurantId,
        });
  
        // Save the partner with updated restaurantId
        await partner.save();
  
        res.status(200).json({
          message: 'Restaurant details already exist',
          restaurant: existingRestaurant,
          status: true,
        });
        return;
      }
  
      // Generating a salt and hashing the password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      console.log("new partner hello")
      // Creating a new partner instance with hashed password
      const newPartner = new Partner({
        name:req.body.name,
        email:req.body.email,
        password: hashPassword,
        phoneNumber:req.body.phoneNumber,
      });
  
      // Saving the new partner to the database
      await newPartner.save();
      console.log("new partner 2")
      // Creating a new restaurant instance
      const newRestaurant = new Restaurant({
        name:name,
        contact:{
          email:email,
          phone: phoneNumber,
        },
        cuisine:"default",
      });
  
      // Saving the new restaurant to the database
      const savedRestaurant = await newRestaurant.save();
  
      // Updating the restaurantId in the partner model
      newPartner.restaurantId = savedRestaurant._id;
      await newPartner.save();
  
      // Retrieving the newly saved partner
      const newSavedPartner = await Partner.findOne({ email });
  
      if (newSavedPartner) {
        // Generating a JWT token for authentication
        const token = jwt.sign(
          { _id: newSavedPartner._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          },
        );
  
        // Storing user information in the session after registration
        req.session.partner = {
          _id: newSavedPartner._id,
          name: newSavedPartner.name,
          email: newSavedPartner.email,
          phoneNumber: newSavedPartner.phoneNumber,
          restaurantId: newSavedPartner.restaurantId
        };
  
        req.session.isAuth = true;
  
        // Sending the response with user information and token
        res.status(201).json({
          _id: newSavedPartner._id,
          name: newSavedPartner.name,
          email: newSavedPartner.email,
          phoneNumber: newSavedPartner.phoneNumber,
          restaurantId: newSavedPartner.restaurantId,
          token,
          status: true,
        });
      } else {
        res.status(500).json({ message: 'Error saving new partner', status: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: false });
    }
  };
  
  
  

const logoutPartner = async (req, res) => {
  
  delete req.session.partner;
  req.session.isAuth = false;
  res.status(201).json({
    status: 'logged out',
    token: null,
  });
};

module.exports = {
authPartner,
registerPartner ,
logoutPartner,

};
