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
    const user = this;

    try {
        //jsonwebtoken을 이용하여 token 생성하기
        const token = jwt.sign(user._id.toHexString(), 'secretToken');
        user.token = token;
        await user.save();
        return token;
    } catch(error) {
        throw new Error(error);
    }
};

userSchema.statics.findByToken = async function(cookieToken) {
    const user = this;

    try {
        //토큰을 decode한다.
        const decodedToken = jwt.verify(cookieToken, 'secretToken');

        //user._id를 이용하여 user를 찾는다.
        //클라이언트에서 가져 온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
        const objectId = new mongoose.Types.ObjectId(decodedToken);
        const foundUser = await user.findOne({
            _id: objectId,
            token: cookieToken
        });
        return foundUser;
    } catch(error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };