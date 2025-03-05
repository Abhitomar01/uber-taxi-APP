const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator')
module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehical } = req.body;

    const iscaptainAlreadyExist = await captainModel.findOne({email})
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

