const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    firstname: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
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
});

userSchema.pre('save', async function(next){
    let user = this;
    if(user.isModified('password')) {
        try {
            //비밀번호 암호화
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch(error) {
            return next(error);
        }
    } else {
        next();
    }
});

userSchema.methods.comparePassword = async function(inputPassword) {
    try {
        return await bcrypt.compare(inputPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


userSchema.methods.generateToken = async function() {
    let user = this;

    try {
        //jsonwebtoken을 이용하여 token 생성하기
        let token = jwt.sign(user._id.toHexString(), 'secretToken');
        user.token = token;
        await user.save();
        return token;
    } catch(error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = {User};