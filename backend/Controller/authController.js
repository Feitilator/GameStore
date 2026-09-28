const db = require('../Database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req,res) =>{
    try{
        const {name, password} = req.body
        if(!name || !password) return res.status(400).json({msg: "Введены не все данные"})

        const [[data]] = await db.query('SELECT * FROM users WHERE name = ?', [name])
        if(data) return res.status(400).json({msg: "Пользователь уже существует"})
        
        const hash = await bcrypt.hash(password,10)
        await db.query("INSERT INTO users(name,password) VALUES(?,?)",[name,hash])
        return res.status(201).json({msg: "Пользователь создан"})
    }catch(error){
        console.log(error)
        return res.status(500).json({error})
    }
    
}

const login = async (req,res) =>{
    try {
        const {name, password} = req.body
        if(!name || !password) return res.status(400).json({msg: "Введены не все данные"})
        
        const [[user]] = await db.query("SELECT * FROM users WHERE name = ?", [name])
        if(!user) return res.status(400).json({msg: "Неверные данные"})
        
        const Match = await bcrypt.compare(password, user.password)
        if(!Match) return res.status(400).json({msg: "Неверные данные"})
        const token = jwt.sign({name: user.name, id: user.id, role: user.role}, process.env.JWT_SECKRET_KEY, {expiresIn: '24h'})    
        res.cookie("token",token, {httpOnly: true})
        res.status(200).json({msg: "Вход успешен", token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error})        
    }
}

const logout = (req,res) =>{
    res.clearCookie("token")
    res.status(200).json({msg: "Выход успешен"})
}

module.exports = {register, login, logout}