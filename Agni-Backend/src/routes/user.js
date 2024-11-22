const express = require('express');
const { register, login, validateRegister } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authmiddleware'); // Import authentication middleware

const router = express.Router();

// User Registration Route
router.post('/register', validateRegister, register);

// User Login Route
router.post('/login', login);

// Protected Route: Get User Profile
router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Profile data retrieved successfully',
        user: req.user, // User information extracted from the JWT
    });
});

module.exports = router;
