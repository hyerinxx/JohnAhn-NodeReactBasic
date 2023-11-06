const express = require('express');
const app = express();
const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(error => console.log(error));

const bodyParser = require('body-parser');
//application/x-www-form-urlencoded 타입의 데이터를 분석하여 가져올 수 있도록 한다.
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입의 데이터를 분석하여 가져올 수 있도록 한다.
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const {User} = require("./models/User");

app.get('/', (req, res) => res.send('Hello World! 안녕하세요! 😊'));

app.post('/register', async (req, res) => {
    //회원가입 시 필요한 정보를 client에서 가져와
    //이를 데이터베이스에 삽입한다.

    //body parser를 이용하여 body에 담긴 정보를 가져온다.
    const user = new User(req.body);

    //mongoDB 메서드 save()를 이용하여 정보를 user 모델에 저장한다.
    const result = await user.save()
    .then(()=>{
        res.status(200).json({success: true});
    }).catch((error) => {
        res.json({success: false, error});
    })
});

app.post('/login', async (req, res) => {
    try {
        //사용자가 전송한 이메일 정보가 데이터베이스에 존재하는지 찾는다.
        const user = await User.findOne({email: req.body.email});
        
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "이메일 정보를 찾을 수 없습니다. 다시 입력하세요."
            });
        }
        
        //이메일 정보가 존재한다면, 비밀번호 정보가 일치하는지 확인힌다.
        const isCorrect = await user.comparePassword(req.body.password);
        
        if(!isCorrect){
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다."
            });
        }
        
        //비밀번호가 일치한다면, 토큰을 생성한다.
        const token = await user.generateToken();

        if(token) {
            //토큰을 저장한다. (저장소: Cookie, Localstorage 등)
            res.cookie("x_auth", token)
            .status(200)
            .json({
                loginSuccess: true,
                userId: user._id
            });
        } else {
            return res.json({
                loginSuccess: false,
                message: "토큰 생성을 실패하였습니다."
            });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            loginSuccess: false,
            message: "서버에서 오류가 발생했습니다."
        });
    }
});