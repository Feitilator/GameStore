const db = require('../Database/db')

const profile = (req,res) =>{
    if(!req.user) return res.status(400).json({msg: "Авторизуйтесь"})

    res.status(200).json({
        name: req.user.name,
        id: req.user.id,
        role: req.user.role,
        
    })
}

module.exports = {profile}