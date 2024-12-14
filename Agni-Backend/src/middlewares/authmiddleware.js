const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Access Denied: Authorization header missing' });
        }

        // Token format should be "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access Denied: Bearer token missing' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Log decoded token to check payload
        console.log("Decoded JWT: ", decoded);

        // Ensure userID exists in the decoded token and attach it to the request object
        if (!decoded || !decoded.userID) {
            return res.status(400).json({ message: 'User ID is missing in token' });
        }

        req.user = { userID: decoded.userID }; // Attach userID from decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT Verification Error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token has expired. Please login again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token. Please provide a valid token.' });
        }

        // Handle other unexpected errors
        res.status(500).json({ message: 'An error occurred while verifying the token.' });
    }
};

module.exports = authenticateToken;
