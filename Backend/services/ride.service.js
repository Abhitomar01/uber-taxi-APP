const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service');
const crypto = require('crypto')

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    if (
        !distanceTime ||
        isNaN(distanceTime.distance) || 
        isNaN(distanceTime.duration)
    ) {
        throw new Error('Invalid distance or time from map service');
    }

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    };

    console.log('Distance Time:', distanceTime);

    // ✅ Correct calculation with unit conversion
    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance  * perKmRate.auto )+ (distanceTime.duration  * perMinuteRate.auto)),
        car: Math.round( baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + (distanceTime.distance  * perKmRate.bike) + (distanceTime.duration * perMinuteRate.bike))
    };

    return fare;
}
 
module.exports.getFare = getFare;

function getOtp(num){
    function genrateOtp(num){
        const otp = crypto.randomInt(Math.pow(10 , num - 1),Math.pow(10,num)).toString();
        return otp;
    }
    return genrateOtp(num)

}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    console.log('Incoming Data:', { user, pickup, destination, vehicleType });

    // ✅ Strict value checking (no empty strings or objects)
    if (
        
        typeof pickup !== 'string' || !pickup.trim() ||
        typeof destination !== 'string' || !destination.trim() ||
        !['auto', 'car', 'bike'].includes(vehicleType)
    ) {
        throw new Error('All fields are required and must be valid strings');
    }

    // ✅ Ensure user is a string or null
    let validUser = null;
    if (typeof user === 'string' && user.trim()) {
        validUser = user.trim();
    } else if (user) {
        validUser = user.toString();
    }

    const fare = await getFare(pickup, destination);

    console.log('Calculated Fare:', fare);

    if (!fare[vehicleType] || isNaN(fare[vehicleType])) {
        throw new Error(`Invalid fare calculated for vehicle type: ${vehicleType}`);
    }

    const ride = await rideModel.create({
        user: validUser, // ✅ Now user is set correctly
        pickup: pickup.trim(),
        destination: destination.trim(),
        otp:getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
}



module.exports.confirmRide = async ({rideId,captain}) => {
    
    if(!rideId){
        throw new Error('Ride ID is required');
        

    }

    await rideModel.findOneAndUpdate({
        _id: rideId},
        {
            status: 'accepted',
            captain: captain._id

        })
    
    const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp')
    
    if(!ride){
        throw new Error('Ride not found');
    }
    return ride;
    

}

module.exports.startRide = async ({rideId, otp, captain}) => {
    console.log(rideId, otp, captain);
    if (!rideId) {
        throw new Error('Ride ID is required');
    }
    if (!otp) {
        throw new Error('OTP is required');
    }
    const ride = await rideModel.findOne({
        _id: rideId,
    }).populate('user').populate('captain').select('+otp')
    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status !== 'accepted'){
        throw new Error('Ride is not accepted');
    }
    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,
    },
    {
        status: 'ongoing',
    })
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride,
    });
    return ride;
    



}

module.exports.endRide = async ({rideId, captain}) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }
    const ride = await rideModel.findOne({
        _id: rideId,
    }).populate('user').populate('captain').select('+otp')
    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status !== 'ongoing'){
        throw new Error('Ride is not ongoing');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,
        captain: captain._id
    },
    {
        status: 'completed',
    })
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride,
    });
    return ride;
    
    
}
