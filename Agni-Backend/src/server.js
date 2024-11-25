require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Database connection logic
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user');

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Route Handlers
app.use('/api/user', userRoutes);

// Error Handling Middleware (must be last)
app.use(errorHandler);

// Server Configuration
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});


// Health Check Routes only for testing
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});
app.get('/Agni', (req, res) => {
    res.json({ message: "Hello!!, It's Agni Team" });
});