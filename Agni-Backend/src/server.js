require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Database connection logic
const errorHandler = require('./middlewares/errorHandler');
const session = require("express-session");
const authRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors({
    origin: "http://localhost:8082", // Frontend URL
    credentials: true, // Allow cookies
}));
app.use(express.json()); // Parse JSON request bodies

// Session middleware (to store OTPs temporarily)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "a!S8D4j$9Lz3Pq@Gx2XcTp4f*mN7kQv%",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Set to true if using HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 10, // 10 minutes
        },
    })
);

// Route Handlers
app.use("/api/auth", authRoutes);

// Health Check Routes only for testing (for development mode)
if (process.env.NODE_ENV === 'development') {
    app.get('/', (req, res) => {
        res.json({ message: 'API is running...' });
    });
    app.get('/Agni', (req, res) => {
        res.json({ message: "Hello!!, It's Agni Team" });
    });
}

// Error Handling Middleware (must be last)
app.use(errorHandler);

// Server Configuration
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('SIGINT signal received. Closing HTTP server gracefully.');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB disconnected');
            process.exit(0);
        });
    });
});
