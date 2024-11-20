const express = require('express');
const { register, login, validateRegister } = require('../controllers/authController');

const router = express.Router();

// User Registration Route
router.post('/register', validateRegister, register);

// User Login Route
router.post('/login', login);

module.exports = router;
