const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from the Authorization header
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    try {
        // Verify token
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Token is usually "Bearer <token>"
        req.user = decoded; // Attach user data to request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};
