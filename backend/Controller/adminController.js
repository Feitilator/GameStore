const path = require('path');
const db = require('../Database/db')
const fs = require("fs")

const gamesList = async (req,res) =>{
    try {
        const [games] = await db.query("SELECT * FROM games g LEFT JOIN games_image gi ON g.id = gi.gameId AND gi.position = 0")
        return res.status(200).json({games})           
    } catch (error) {
        return res.status(500).json({error})
    }

}
const usersList = async (req,res) =>{
    try {
        const [users] = await db.query("SELECT * FROM users")
        return res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({error})
    }

}
const deleteUser = async (req,res) =>{
    try {
        const {id} = req.params
        await db.query("DELETE FROM users WHERE id = ?",[id])
        res.status(200).json({msg: "Успешно"})
    } catch (error) {
        return res.status(500).json({error})
    }

}

const createGame = async (req,res) =>{
    try {
        const {title, description, price} = req.body
        const files = req.files
        
        if(!files || files.length === 0){
            return res.status(400).json({msg: "Добавьте хотя бы одну картинку"})
        }
        const [gameResult] = await db.query("INSERT INTO games (title, description, price) VALUES (?,?,?)",[title,description,price])
        const gameId = gameResult.insertId
        for (let i = 0; i < files.length; i++){
            await db.query("INSERT INTO games_image(gameId, image, position) VALUES(?,?,?)",
                [gameId,`/uploads/${files[i].filename}`,i])
        }
        return res.status(201).json({  
            msg: "Игра создана",
            gameId
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ошибка создания игры"
        })
    }
}

const deleteGame = async (req,res) =>{
    try {
        const {id} = req.params
        const [images] = await db.query("SELECT image FROM games_image WHERE gameId = ?",[id])
        for(let image of images){
            const filePath = path.join(__dirname, "..",image.image)
            
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
        }

        const [result] = await db.query("DELETE FROM games WHERE id = ?",[id])
        if(!result) return res.status(404).json({msg:"Игра не найдена"})

        return res.status(200).json({msg: "Игра удалена"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Ошибка удаление игры"})
    }
}

module.exports = {gamesList,usersList,deleteUser,createGame,deleteGame}