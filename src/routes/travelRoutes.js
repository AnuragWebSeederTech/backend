// src/routes/travelRoutes.js
const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

/**
 * @route GET /api/flights/search
 * @description Search for flight offers
 * @queryParam origin {string} IATA code of origin airport (e.g., "DEL")
 * @queryParam destination {string} IATA code of destination airport (e.g., "BOM")
 * @queryParam departureDate {string} Departure date in YYYY-MM-DD format (e.g., "2025-08-15")
 * @queryParam [returnDate] {string} Optional return date in YYYY-MM-DD format
 * @queryParam [adults] {number} Number of adults (default: 1)
 */
router.get('/flights/search', travelController.getFlightOffers);

/**
 * @route GET /api/hotels/search
 * @description Search for hotel offers
 * @queryParam cityCode {string} IATA city code (e.g., "LON" for London)
 * @queryParam checkInDate {string} Check-in date in YYYY-MM-DD format (e.g., "2025-09-01")
 * @queryParam checkOutDate {string} Check-out date in YYYY-MM-DD format (e.g., "2025-09-05")
 * @queryParam [adults] {number} Number of adults (default: 1)
 */
router.get('/hotels/search', travelController.getHotelOffers);

module.exports = router;