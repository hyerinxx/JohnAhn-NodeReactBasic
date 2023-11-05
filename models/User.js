const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

userSchema.pre('save', function(next){
    let user = this;
    if(user.isModified('password')) {
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(error, salt) {
            if(error) return next(error);
            bcrypt.hash(user.password, salt, function(error, hash) {
                if(error) return next(error);
                user.password = hash;
                next();
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}