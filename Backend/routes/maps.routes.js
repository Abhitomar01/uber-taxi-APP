const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware');
const mapsController=require('../controllers/map.controller');
const {query} = require('express-validator');
router.get('/get-coordinates',
    query('address').isString().notEmpty().isLength({min:3}),
    authMiddleware.authUser,mapsController.getCoordinate

)
router.get('/get-distance-time',
    query('origin').isString().notEmpty().isLength({min:3}),
    query('destination').isString().notEmpty().isLength({min:3}),
    authMiddleware.authUser,mapsController.getDistanceTime
    
)
router.get('/get-suggestions',
    query('input').isString().isLength({min:1}),
    authMiddleware.authUser,
    mapsController.getAutoCompleteSuggestion
)


module.exports = router;