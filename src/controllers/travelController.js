// src/controllers/travelController.js
const amadeusService = require('../services/amadeusService');

/**
 * Handles the flight search request.
 * Expects query parameters: origin, destination, departureDate, returnDate (optional), adults (optional).
 */
const getFlightOffers = async (req, res) => {
    const { origin, destination, departureDate, returnDate, adults } = req.query;

    // Basic validation
    if (!origin || !destination || !departureDate) {
        return res.status(400).json({ error: 'Missing required query parameters: origin, destination, and departureDate.' });
    }

    try {
        const flightOffers = await amadeusService.searchFlightOffers({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: parseInt(adults, 10) || 1,
        });
        res.status(200).json(flightOffers);
    } catch (error) {
        console.error('Controller error in getFlightOffers:', error.message);
        res.status(500).json({ error: error.message || 'Internal server error during flight search.' });
    }
};

/**
 * Handles the hotel search request.
 * Expects query parameters: cityCode, checkInDate, checkOutDate, adults (optional).
 */
const getHotelOffers = async (req, res) => {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;

    // Basic validation for hotels
    if (!cityCode || !checkInDate || !checkOutDate) {
        return res.status(400).json({ error: 'Missing required query parameters: cityCode, checkInDate, and checkOutDate.' });
    }

    // You might want to add more robust date validation (e.g., YYYY-MM-DD format, future date)
    // and city code validation here.

    try {
        const hotelOffers = await amadeusService.searchHotelOffers({
            cityCode: cityCode,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            adults: parseInt(adults, 10) || 1, // Ensure adults is a number, default to 1
        });
        res.status(200).json(hotelOffers);
    } catch (error) {
        console.error('Controller error in getHotelOffers:', error.message);
        res.status(500).json({ error: error.message || 'Internal server error during hotel search.' });
    }
};


module.exports = {
    getFlightOffers,
    getHotelOffers, // Export the new controller function
};