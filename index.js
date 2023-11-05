const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyerin:imhyerinsung@boiler-plate.8u0ihcn.mongodb.net/')
.then(() => console.log('MongoDB Connected...'))
.catch(error => console.log(error))

const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World! 안녕하세요!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))