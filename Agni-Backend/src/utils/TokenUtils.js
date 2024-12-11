const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'a!S8D4j$9Lz3Pq@Gx2XcTp4f*mN7kQv%';


exports.generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
