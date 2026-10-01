const db = require('../Database/db')

const getGame = async (req,res) =>{
    try {
       const [games] = await db.query("SELECT * FROM games g LEFT JOIN games_image gi ON g.id = gi.gameID AND gi.position = 0")
        return res.status(200).json({games})
    } catch (error) {
        return res.status(500).json({msg: "Не получилось выдать список игр "})
    }  
    
}

const topGame = async (req,res) =>{
    try {
       const [games] = await db.query("SELECT * FROM games g LEFT JOIN games_image gi ON g.id = gi.gameID AND gi.position = 0 LIMIT 5")
        return res.status(200).json({games})
    } catch (error) {
        return res.status(500).json({msg: "Не получилось выдать список игр "})
    }  
    
}

module.exports = {getGame,topGame}