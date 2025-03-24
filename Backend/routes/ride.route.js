const express= require('express')
const router=express.Router()
const {body,query}=require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination '),
    body('vehicleType').isString().isIn(['auto','car','bike']).withMessage('Invalid vehical Type'),
    rideController.createRide



)
console.log(authMiddleware.authUser)
router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    rideController.getFare
);

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isString().isLength({min:3}).withMessage('Invalid ride Id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid otp'),
    rideController.startRide   
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.endRide
)





module.exports = router