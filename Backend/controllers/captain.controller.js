const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model')
const jwt = require('jsonwebtoken')
module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehical } = req.body;

    const iscaptainAlreadyExist = await captainModel.findOne({ email })
    if (iscaptainAlreadyExist) {
        return res.status(400).json({ errors: [{ msg: 'captain already exists' }] })
    }

    const hashPassword = await captainModel.hashPassword(password)
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehical.color,
        plate: vehical.plate,
        capacity: vehical.capacity,
        vehicaltype: vehical.vehicaltype
    })
    const token = captain.generateAuthToken()
    res.status(201).json({ captain, token })

}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ msg: 'Invalid email or password' })
    }
    const isMatch = await captain.comparePassword(password)
    if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid email or password' })
    }
    const token = captain.generateAuthToken()
    res.cookie('token', token)
    res.status(200).json({ token, captain })
}
module.exports.getCaptainProfile = async (req, res) => {
    try {
        if (!req.captain) {
            return res.status(404).json({ msg: 'Captain not found' });
        }
        res.status(200).json(req.captain);
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};



module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token })
    res.clearCookie('token')
    res.status(200).json({ msg: 'logout successfully' })
}

