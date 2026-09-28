const db = require('../Database/db')


const gamesList = async (req,res) =>{
    const [games] = await db.query("SELECT * FROM games")
    res.status(200).json({games})
}
const usersList = async (req,res) =>{
    const [users] = await db.query("SELECT * FROM users")
    res.status(200).json({users})
}
const deleteUser = async (req,res) =>{
    const {id} = req.params
    await db.query("DELETE FROM users WHERE id = ?",[id])
    res.status(200).json({msg: "Успешно"})
}

module.exports = {gamesList,usersList,deleteUser}