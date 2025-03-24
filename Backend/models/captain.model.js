const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "first name be at least 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, 'last name must be at least 3 characters long']
        }

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehical: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color must be at least 3 characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'plate must be at least 3 characters']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capicity must be at least 1']
        },
        vehicaltype: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        }

    },
    location: {
        ltd: {
            type: Number,
            
        },
        lng: {
            type: Number,
            
        }
    }

})


captainSchema.methods.generateAuthToken = function() {    
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET
        , {
            expiresIn: '24h'
            })
    return token
}

captainSchema.methods.comparePassword =async function (password){
    return await bcrypt.compare(password, this.password)

}
captainSchema.statics.hashPassword = async function (password){
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const captainModel = mongoose.model('captain', captainSchema)
module.exports = captainModel;