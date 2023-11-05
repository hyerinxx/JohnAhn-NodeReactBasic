const express = require('express')
const app = express()
const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyerin:imhyerinsung@boiler-plate.8u0ihcn.mongodb.net/')
.then(() => console.log('MongoDB Connected...'))
.catch(error => console.log(error))

const {User} = require("./models/User");
const bodyParser = require('body-parser');
//application/x-www-form-urlencoded 타입의 데이터를 분석하여 가져올 수 있도록 한다.
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입의 데이터를 분석하여 가져올 수 있도록 한다.
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World! 안녕하세요!'))

app.post('/register', async (req, res) => {
    //회원가입 시 필요한 정보를 client에서 가져와
    //이를 데이터베이스에 삽입한다.

    //body parser를 이용하여 body에 담긴 정보를 가져온다.
    const user = new User(req.body)

    //mongoDB 메서드 save()를 이용하여 정보를 user 모델에 저장한다.
    const result = await user.save().then(()=>{
        res.status(200).json({success: true})
    }).catch((error)=>{
        res.json({success: false, error})
    })
})