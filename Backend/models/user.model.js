const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
        type: String,
        required: true,
        minlength: [6, 'First name must be at least 6 characters long']
    },
    lastname: {
        type: String,
        minlength: [6, 'Last name must be at least 6 characters long']
    },
},
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Email must be at least 6 characters long']
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    socketID: {
        type: String,
        
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);
}

userSchema.statics.hashPassword = async function (Password) {
    return await bcrypt.hash(Password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

