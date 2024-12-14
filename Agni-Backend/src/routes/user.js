const express = require('express');
const router = express.Router();
const { register, login, validateRegister } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authmiddleware'); // Import authentication middleware
const User = require('../models/user');
const authController = require("../controllers/authController");

// User Registration Route
router.post('/register', validateRegister, register);

// User Login Route
router.post('/login', login);

// Test Route to Add User
router.post('/add', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected Route: Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            message: 'Profile data retrieved successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
});

// Get All Users Route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Fetch all users and exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

//send otp via email
router.post("/sendotp", authController.sendOtp);

//verify otp
router.post("/verifyotp", authController.verifyOtp);

module.exports = router;
