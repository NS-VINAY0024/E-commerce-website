const express = require('express');
const { register, login, validateRegister } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authmiddleware'); // Import authentication middleware
const User = require('../models/user');

const router = express.Router();

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
router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Profile data retrieved successfully',
        user: req.user, // User information extracted from the JWT
    });
});

module.exports = router;
