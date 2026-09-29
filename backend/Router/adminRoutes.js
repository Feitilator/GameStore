const { gamesList, usersList, deleteUser, createGame } = require('../Controller/adminController');
const { checkRole, middleware } = require('../Middleware/Middleware');
const upload = require('../Middleware/upload');

const router = require('express').Router()

router.get('/gameslist', middleware ,checkRole("admin"),gamesList)
router.get('/userslist', middleware ,checkRole("admin"),usersList)
router.post('/creategame', middleware, checkRole("admin"),upload.array("images", 5),createGame)
router.delete('/deleteuser/:id', middleware ,checkRole("admin"),deleteUser)

module.exports = router