const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const getFare = require('../services/ride.service');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // ✅ Extract data from request body
    const { userId, pickup, destination, vehicleType } = req.body;
    const user = req.user ? req.user._id : userId; // ✅ Set user to null if not authenticated
    console.log(user)
   
    try {
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates)

        const ride = await rideService.createRide({ user:req.user._id, pickup, destination, vehicleType });
        ride.otp=""
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,2);
        
        const rideWithUser= await rideModel.findOne({_id:ride._id}).populate('user')
        captainsInRadius.map(async captain=>{
            console.log(captain,ride)
        
            sendMessageToSocketId(captain.socketId, {
                event:'new-ride',
                data:rideWithUser,
            })
        })
        
        res.status(201).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // ✅ Extract data from request body
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare( pickup, destination );
        return res.status(201).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    console.log("Confirm Ride Request Body:", req.body);
    console.log("Authenticated Captain:", req.captain);
    console.log("Authenticated User:", req.user);

    const { rideId } = req.body;
    
    try {
        // ✅ Update the ride with captain info
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });
        // ✅ Fetch ride again with user and captain details
        const populatedRide = await rideModel.findById(rideId)
            .populate('user')
            .populate('captain')
            .select('+otp');

        if (!populatedRide.user) {
            return res.status(404).json({ message: "User not found for this ride" });
        }

        console.log("🚀 Sending ride confirmation to:", populatedRide.user.socketId);

        sendMessageToSocketId(populatedRide.user.socketId, {
            event: 'ride-confirmed',
            data: populatedRide,
        });

        return res.status(201).json(populatedRide);
    } catch (err) {
        console.error("❌ Error in confirmRide:", err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }
    )}

    // Changed from req.body to req.query to match GET parameters
    const { rideId, otp } = req.query;
    try {
        const ride = await rideService.startRide({rideId, otp, captain:req.captain});
        
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: ride,
            });
            return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
            
}
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride,
        });
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
