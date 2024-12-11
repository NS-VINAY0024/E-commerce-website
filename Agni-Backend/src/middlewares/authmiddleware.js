const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'a!S8D4j$9Lz3Pq@Gx2XcTp4f*mN7kQv%';

// Middleware to verify JWT token
exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from the Authorization header
    console.log('Token received:', token); // Add this log for debugging
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    try {
        // Verify token
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); // Token is usually "Bearer <token>"
        req.user = decoded; // Attach user data to request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};

const { verifyToken } = require('../utils/TokenUtils');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized: ' + error.message });
    }
};
