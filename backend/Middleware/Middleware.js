const jwt = require('jsonwebtoken')
require('dotenv').config()

const middleware = (req,res,next) =>{
    const token = req.cookies.token
    if(!token) return res.status(400).json({msg: "Авторизуйтесь"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECKRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error})
    }
}

const checkRole = (role) =>{
    return (req,res,next) =>{
        middleware(req,res, () =>{
            if (!role.includes(req.user.role)){
                return res.status(403).json({msg: "Нет доступа"})
            }
            next()
        })
    }
}

module.exports = {middleware, checkRole}