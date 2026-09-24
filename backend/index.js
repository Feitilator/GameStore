const express = require('express')
const app = express()
const cors = require('cors')
const CookieParser = require('cookie-parser')
require('dotenv').config()

app.use(CookieParser())
app.use(cors({
    origin: process.env.API_FRONTEND,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', require('./Router/authRoutes'))


app.listen(process.env.PORT, "0.0.0.0", () =>{
    console.log(`http://localhost:${process.env.PORT}`)
})