require('dotenv').config(); // Loads environment variables from .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import centralized DB connection logic
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Import routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes); // Prefix all user-related routes with '/api/user'

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Another Test Route
app.get('/Agni', (req, res) => {
    res.send("Hello!!, It's Agni Team");
});

// Error Handling Middleware
app.use(errorHandler); // Ensure this is placed after routes

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
