// src/app.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const travelRoutes = require('./routes/travelRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route for checking server status
app.get('/', (req, res) => {
    res.send('Amadeus Backend is running!');
});

// Use the travel routes for /api endpoints
app.use('/api', travelRoutes); // All routes defined in travelRoutes will be prefixed with /api

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access your API at http://localhost:${PORT}/api`);
});