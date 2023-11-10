const { User } = require("../models/User");

//인증 처리를 하는 곳
let auth = (async (req, res, next) => {

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    try {
        //토큰을 복호화한 후 유저를 찾는다.
        const user = await User.findByToken(token);

        //유저가 없으면 인증 No!
        if(!user) return res.json({
            isAuth: false,
            error: true
        });

        //유저가 있으면 인증 Okay
        req.token = token;
        req.user = user;
        next();

    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { auth };