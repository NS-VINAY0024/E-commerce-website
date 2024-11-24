// src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Determine status code and message
    const statusCode = res.statusCode === 200 ? err.status || 500 : res.statusCode;
    const message = err.message || 'Internal Server Error';

    // Log the error stack for debugging (only in development)
    if (process.env.NODE_ENV !== 'production') {
        console.error(`Error: ${message}`);
        console.error(err.stack);
    }

    // Send JSON response
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }), // Include stack trace only in non-production
        },
    });
};

module.exports = errorHandler;
