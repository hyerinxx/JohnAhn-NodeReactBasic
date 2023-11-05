const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        type: String,
        maxlength: 50
    },
    password: {
        type: String,
        maxlength: 12
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}