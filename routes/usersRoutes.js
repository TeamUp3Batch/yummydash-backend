const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// Route for user registration
router.post("/signup", registerUser);

module.exports = router;
