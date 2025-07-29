// src/services/amadeusService.js
const axios = require('axios');

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;
const AMADEUS_AUTH_URL = process.env.AMADEUS_AUTH_URL;
const AMADEUS_BASE_URL = process.env.AMADEUS_BASE_URL; // For Hotels, it's typically /v3, not /v2

let accessToken = null;
let tokenExpiryTime = 0; // Unix timestamp when token expires

/**
 * Retrieves or refreshes the Amadeus access token.
 * Tokens expire, so this function ensures we always have a valid one.
 */
const getAccessToken = async () => {
    // Check if token is still valid (e.g., 60 seconds before actual expiry)
    if (accessToken && Date.now() < tokenExpiryTime - 60 * 1000) {
        return accessToken;
    }

    console.log('Amadeus token expired or not available. Refreshing...');

    try {
        const response = await axios.post(
            AMADEUS_AUTH_URL,
            `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        accessToken = response.data.access_token;
        tokenExpiryTime = Date.now() + response.data.expires_in * 1000; // Convert seconds to milliseconds
        console.log('Amadeus token refreshed successfully.');
        return accessToken;
    } catch (error) {
        console.error('Error fetching Amadeus access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get Amadeus access token.');
    }
};

/**
 * Searches for flight offers using the Amadeus Flight Offers Search API.
 * @param {object} params - Object containing search parameters.
 * @param {string} params.originLocationCode - IATA code of the origin airport (e.g., "DEL").
 * @param {string} params.destinationLocationCode - IATA code of the destination airport (e.g., "BOM").
 * @param {string} params.departureDate - Departure date in YYYY-MM-DD format (e.g., "2025-08-15").
 * @param {string} [params.returnDate] - Optional return date in YYYY-MM-DD format.
 * @param {number} [params.adults=1] - Number of adults.
 * @returns {Promise<object>} - A promise that resolves to the flight search results.
 */
const searchFlightOffers = async ({ originLocationCode, destinationLocationCode, departureDate, returnDate, adults = 1 }) => {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('No access token available for Amadeus API.');
        }

        const params = {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            adults,
            ...(returnDate && { returnDate }),
        };

        const response = await axios.get(`${AMADEUS_BASE_URL}/shopping/flight-offers`, { // V2 endpoint for flights
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params,
        });

        return response.data;
    } catch (error) {
        console.error('Error searching flight offers:', error.response ? error.response.data : error.message);
        throw new Error('Failed to search flight offers with Amadeus.');
    }
};

/**
 * Searches for hotel offers using the Amadeus Hotel Search API.
 * @param {object} params - Object containing search parameters.
 * @param {string} params.cityCode - IATA code of the city (e.g., "PAR" for Paris).
 * @param {string} params.checkInDate - Check-in date in YYYY-MM-DD format.
 * @param {string} params.checkOutDate - Check-out date in YYYY-MM-DD format.
 * @param {number} [params.adults=1] - Number of adults.
 * @returns {Promise<object>} - A promise that resolves to the hotel search results.
 */
const searchHotelOffers = async ({ cityCode, checkInDate, checkOutDate, adults = 1 }) => {
    try {
        const token = await getAccessToken();
        if (!token) {
            throw new Error('No access token available for Amadeus API.');
        }

        const params = {
            cityCode,
            checkInDate,
            checkOutDate,
            adults,
            // Add other parameters like roomQuantity, priceRange, boardType, amenities, etc., as needed
            // hotelIds: 'ABCDEFGH' // Example for searching specific hotel IDs
        };

        // Note: The Hotel Search API uses /v3
        const response = await axios.get(`${AMADEUS_BASE_URL.replace('/v2', '/v3')}/shopping/hotel-offers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params,
        });

        return response.data;
    } catch (error) {
        console.error('Error searching hotel offers:', error.response ? error.response.data : error.message);
        throw new Error('Failed to search hotel offers with Amadeus.');
    }
};

module.exports = {
    searchFlightOffers,
    searchHotelOffers, // Export the new function
};