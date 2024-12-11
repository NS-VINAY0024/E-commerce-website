const jwt = require('jsonwebtoken');
require('dotenv').config();

// Use the same JWT_SECRET as in your application
const JWT_SECRET = process.env.JWT_SECRET || 'yourfallbacksecret';

// Test payload
const payload = {
    userId: '12345',
    username: 'testuser'
};

// Function to test JWT signing and verification
const testJwt = () => {
    try {
        console.log('Testing JWT Secret:', JWT_SECRET);

        // 1. Sign a token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);

        // 2. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Payload:', decoded);

        // If everything works
        console.log('✅ JWT signing and verification succeeded!');
    } catch (error) {
        // Catch errors during signing or verification
        console.error('❌ JWT test failed:', error.message);
    }
};

// Call the function
testJwt();
