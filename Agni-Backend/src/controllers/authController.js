const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { generateOtp, sendOtpEmail } = require('../utils/otputils'); // Adjust path as needed
const JWT_SECRET = process.env.JWT_SECRET || 'a!S8D4j$9Lz3Pq@Gx2XcTp4f*mN7kQv%';


// Validation for registration
exports.validateRegister = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('Password must be stronger'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })

];

// Register a new user
exports.register = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the username already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if the email already exists
        existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Set expiration time
        });


        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        next(error);
    }
};



// Login an existing user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        let user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate a token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Logged in successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};

exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const otp = generateOtp();
        req.session.emailOtp = otp; // Store OTP in session
        console.log("OTP stored in session:", req.session);

        await sendOtpEmail(email, req.session.emailOtp);
        console.log("OTP during send:", req.session.emailOtp);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};

exports.verifyOtp = async (req, res) => {
    const { otp } = req.body; // Get OTP from frontend
    console.log("Session data on verify:", req.session);
    console.log("OTP received from frontend:", otp);
    console.log("OTP stored in session:", req.session.emailOtp);

    // Check if OTP exists in session
    if (!req.session.emailOtp) {
        return res.status(400).json({ success: false, message: "No OTP found. Please request a new one." });
    }

    // Compare the OTP
    if (otp === req.session.emailOtp) {
        req.session.emailOtp = null; // Clear OTP from session after successful verification
        return res.status(200).json({ success: true, message: "OTP verified successfully." });
    } else {
        return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
    }
};