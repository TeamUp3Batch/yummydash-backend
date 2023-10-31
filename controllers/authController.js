const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Auth user & get token
const authUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      // Store user info in session
      req.session.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      };
      req.session.isAuth = true;

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
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

// Register a new user
const registerUser = async (req, res) => {
  const {firstName, lastName, email, phoneNumber, password} = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.status(400).json({message: 'All fields are mandatory', status: false});
    return;
  }
  try {
    const userExists = await User.findOne({email: req.body.email});

    if (userExists) {
      res.status(400).json({message: 'User already exists'});
      return;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashPassword,
    });

    await newUser.save();
    const newSavedUser = await User.findOne({email});
    if (newSavedUser) {
      const token = jwt.sign(
          {_id: newSavedUser._id},
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          },
      );

      // Store user information in the session after registration
      req.session.user = {
        _id: newSavedUser._id,
        firstName: newSavedUser.firstName,
        lastName: newSavedUser.lastName,
        email: newSavedUser.email,
        address: [],
      };
      req.session.isAuth = true;
      res.status(201).json({
        _id: newSavedUser._id,
        firstName: newSavedUser.firstName,
        lastName: newSavedUser.lastName,
        email: newSavedUser.email,
        phoneNumber: newSavedUser.email,
        address: [],
        token,
        status: true,
      });
    } else {
      res.status(500).json({message: 'Error saving new user', status: false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

const logoutUser = async (req, res) => {
  delete req.session.user;
  req.session.isAuth = false;
  res.status(201).json({
    status: 'logged out',
    token: null,
  });
};

module.exports = {
  authUser,
  registerUser,
  logoutUser,
};
