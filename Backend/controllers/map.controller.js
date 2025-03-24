const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract `address` from query correctly
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const coordinate = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinate);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ message: error.message });
    }
};
module.exports.getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
        
        
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ message: error.message });
    }
        
    }
module.exports.getAutoCompleteSuggestion = async (req, res,next) => {
    try {
        const errors = validationResult(req);
if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
}
        const { input } = req.query;
        console.log('Input to mapService:', input)
        const suggestions = await mapService.getAutoCompleteSuggestion(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        res.status(500).json({ message: error.message });
    }
}
