require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const fileupload = require("express-fileupload")
const path = require('path')

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.static(path.resolve('static')))
app.use(fileupload())
app.use('/', router)

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/statistics', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()