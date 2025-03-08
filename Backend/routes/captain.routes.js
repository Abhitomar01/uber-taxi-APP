const express= require('express')
const captainController = require('../controllers/captain.controller')
const router = express.Router();
const {body} = require("express-validator")
const captainService = require('../services/captain.service');
const authmiddleware = require('../middlewares/auth.middleware');

//const userController = require("../controllers/user.controller"); // Adjust path if needed


router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehical.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehical.plate').isLength({min: 3}).withMessage('plate must be at least 3 characters long'),
    body('vehical.capacity').isLength({min: 1}).withMessage('capicity must be at least 1'),
    body('vehical.vehicaltype').isIn(['car','bike','auto']).withMessage('Invalid vehical type')
],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],captainController.loginCaptain)

router.get('/profile',authmiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout',authmiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;