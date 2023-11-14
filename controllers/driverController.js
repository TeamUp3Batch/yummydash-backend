const {Driver} = require('../models/driver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Auth Driver & get token
const authDriver = async (req, res) => {
    const {email, password} = req.body;
    try {
      const driver = await Driver.findOne({email});
  
      if (driver && (await bcrypt.compare(password, driver.password))) {
        const token = jwt.sign({_id: driver._id}, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        // Store driver info in session
        req.session.driver = {
          _id: driver._id,
          firstName: driver.firstName,
          lastName: driver.lastName,
          email: driver.email,
          phoneNumber: driver.phoneNumber,
 
        };
        req.session.isAuth = true;
  
        res.status(201).json({
          _id: driver._id,
          firstName: driver.firstName,
          lastName: driver.lastName,
          email: driver.email,
          phoneNumber: driver.phoneNumber,
         
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





// Register a new driver

const registerDriver = async (req, res) => {


    const { firstName, lastName, email, phoneNumber, password } = req.body;
  
    // Checking if any required field is missing
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      res.status(400).json({ message: 'All fields are mandatory', status: false });
      return;
    }
  
    try {
      // Checking if a driver with the same email already exists
      const driverExists = await Driver.findOne({ email: req.body.email });
  
      if (driverExists) {
        res.status(400).json({ message: 'Driver details already exist' });
        return;
      }
  
      // Generating a salt and hashing the password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(password, salt);
  
      // Creating a new Driver instance with hashed password
      const newDriver = new Driver({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashPassword,
      });
  
      // Saving the new driver to the database
      await newDriver.save();
  
      // Retrieving the newly saved driver
      const newSavedDriver = await Driver.findOne({ email });
  
      if (newSavedDriver) {
        // Generating a JWT token for authentication
        const token = jwt.sign(
          { _id: newSavedDriver._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          },
        );
  
        // Storing user information in the session after registration
        req.session.driver = {
          _id: newSavedDriver._id,
          firstName: newSavedDriver.firstName,
          lastName: newSavedDriver.lastName,
          email: newSavedDriver.email,
        };
  
        req.session.isAuth = true;
  
        // Sending the response with user information and token
        res.status(201).json({
          _id: newSavedDriver._id,
          firstName: newSavedDriver.firstName,
          lastName: newSavedDriver.lastName,
          email: newSavedDriver.email,
          phoneNumber: newSavedDriver.phoneNumber, // Corrected the field name
          token,
          status: true,
        });
      } else {
        res.status(500).json({ message: 'Error saving new driver', status: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

const logoutDriver = async (req, res) => {
  
  delete req.session.driver;
  req.session.isAuth = false;
  res.status(201).json({
    status: 'logged out',
    token: null,
  });
};

module.exports = {
authDriver,
registerDriver ,
logoutDriver,

};
