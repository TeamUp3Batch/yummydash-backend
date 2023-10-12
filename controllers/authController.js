const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Auth user & get token
const authUser = async (req, res) => {
  console.log("hitting auth User")
  const { email, password } = req.body;
console.log("email and password",req.body.email,req.body.password)
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address:user.address,
        token,
        status:true
      });
    } else {
      res.status(401).json({ message: "Invalid email or password",status:false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error",status:false });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  console.log("hitting signup")
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: "All fields are mandatory" });
    return;
  }
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    console.log("sale here",salt)
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    const newSavedUser = await User.findOne({ email });
    if (newSavedUser) {
      const token = jwt.sign({ _id: newSavedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

    res.status(201).json({  _id: newSavedUser._id,
      firstName: newSavedUser.firstName,
      lastName: newSavedUser.lastName,
      email: newSavedUser.email,
      address:[],
      token,status:true });
  }
  else{
    res.status(500).json({ message: "Error saving new user" });
  }
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async(req,res) =>{
  res.status(201).json({
    status:"logged out",
    token:null
  })

}

module.exports = {
  authUser,
  registerUser,
  logoutUser
};
