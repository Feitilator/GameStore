const { getGame, topGame } = require('../Controller/gameController');

const router = require('express').Router()

router.get("/",topGame)

module.exports = router