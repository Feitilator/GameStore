const express = require('express')
const app = express()
const cors = require('cors')
const CookieParser = require('cookie-parser')
require('dotenv').config()
const path = require('path')

app.use(CookieParser())
app.use(cors({
    origin: process.env.API_FRONTEND,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', require('./Router/authRoutes'))
app.use('/api/profile',require('./Router/profileRoutes'))
app.use('/api/admin',require('./Router/adminRoutes'))
app.use('/api/game',require('./Router/gameRouter'))

app.listen(process.env.PORT, "0.0.0.0", () =>{
    console.log(`http://localhost:${process.env.PORT}`)
})