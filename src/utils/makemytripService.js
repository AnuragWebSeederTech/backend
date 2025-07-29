// // utils/makemytripService.js
// const axios = require('axios');

// const BASE_URL = process.env.MAKEMYTRIP_BASE_URL;
// const API_KEY = process.env.MAKEMYTRIP_API_KEY; // Or whatever auth method they use

// const apiClient = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         // This might vary based on API docs (e.g., 'x-api-key', 'Authorization: Bearer YOUR_TOKEN')
//         'X-API-Key': API_KEY,
//         'Content-Type': 'application/json'
//     },
// });

// async function searchFlights(origin, destination, departureDate, returnDate = null) {
//     try {
//         const response = await apiClient.get('/flights/search', {
//             params: {
//                 origin,
//                 destination,
//                 departureDate,
//                 returnDate // Only include if returnDate is provided
//             }
//         });
//         return response.data; // The actual flight data
//     } catch (error) {
//         console.error('Error searching flights:', error.response ? error.response.data : error.message);
//         throw new Error('Failed to search flights');
//     }
// }

// async function searchHotels(city, checkInDate, checkOutDate, guests = 1) {
//     try {
//         const response = await apiClient.post('/hotels/search', {
//             city,
//             checkInDate,
//             checkOutDate,
//             guests
//         });
//         return response.data; // The actual hotel data
//     } catch (error) {
//         console.error('Error searching hotels:', error.response ? error.response.data : error.message);
//         throw new Error('Failed to search hotels');
//     }
// }

// module.exports = {
//     searchFlights,
//     searchHotels
// };