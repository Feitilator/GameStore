const { gamesList, usersList, deleteUser, createGame, deleteGame } = require('../Controller/adminController');
const { checkRole, middleware } = require('../Middleware/Middleware');
const upload = require('../Middleware/upload');

const router = require('express').Router()

router.get('/games', middleware ,checkRole("admin"),gamesList)
router.get('/users', middleware ,checkRole("admin"),usersList)
router.post('/game', middleware, checkRole("admin"),upload.array("images", 5),createGame)
router.delete('/user/:id', middleware ,checkRole("admin"),deleteUser)
router.delete("/game/:id",middleware,checkRole("admin"),deleteGame)

module.exports = router