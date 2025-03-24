const axios = require('axios');
const captainModel=require('../models/captain.model')


// ✅ Get coordinates using Google Maps Geocoding API
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        console.log(`Geocoding Response for "${address}":`, JSON.stringify(response.data, null, 2));

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            console.log(`Coordinates for "${address}":`, location);
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw new Error('Unable to find location');
    }
};

// ✅ Get distance and time using OpenRouteService
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin or destination is missing');
    }

    // ✅ Geocode origin and destination
    const originCoords = await module.exports.getAddressCoordinate(origin);
    const destinationCoords = await module.exports.getAddressCoordinate(destination);

    if (!originCoords || !destinationCoords) {
        throw new Error('Invalid coordinates for origin or destination');
    }

    if (!process.env.ORS_API_KEY) {
        throw new Error('ORS API Key is missing');
    }

    const url = `https://api.openrouteservice.org/v2/matrix/driving-car`;

    // ORS expects coordinates in [lng, lat] format
    const data = {
        locations: [
            [originCoords.lng, originCoords.lat],
            [destinationCoords.lng, destinationCoords.lat]
        ],
        metrics: ['distance', 'duration']
    };

    console.log('Request URL:', url);
    console.log('Request Data:', JSON.stringify(data, null, 2));

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': process.env.ORS_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('ORS Matrix API Response:', JSON.stringify(response.data, null, 2));

        if (
            response.data.distances &&
            response.data.durations &&
            response.data.distances[0][1] !== undefined &&
            response.data.durations[0][1] !== undefined
        ) {
            // ✅ Keep values as numbers (no string formatting)
            const distance = response.data.distances[0][1] / 1000; // meters to km
            const duration = response.data.durations[0][1] / 60;   // seconds to minutes

            console.log(`Distance: ${distance} km, Duration: ${duration} mins`);

            if (isNaN(distance) || isNaN(duration)) {
                throw new Error('Invalid distance or time from map service');
            }

            return {
                distance,
                duration,
                rawResponse: response.data
            };
        } else {
            throw new Error('No route found');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.response?.data || error.message);
        throw new Error('Unable to fetch distance and time');
    }
};

// ✅ Get autocomplete suggestions using Google Maps Places API
module.exports.getAutoCompleteSuggestion = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Autocomplete failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        throw new Error('Unable to fetch autocomplete suggestions');
    }
};
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    //radius in Km
    const captains = await captainModel.find({
location: {
    $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371]
    }
}
    });
    return captains;

}
