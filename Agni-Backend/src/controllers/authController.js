const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Validation for registration
exports.validateRegister = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Register a new user
exports.register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Create a new user
        user = new User({ username, email, password });
        await user.save();

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        next(error);
    }
};

// Login an existing user
exports.login = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        next(error);
    }
};