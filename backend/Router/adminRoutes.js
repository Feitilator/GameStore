const { gamesList, usersList, deleteUser } = require('../Controller/adminController');
const { checkRole } = require('../Middleware/Middleware');

const router = require('express').Router()

router.get('/gameslist',checkRole("admin"),gamesList)
router.get('/userslist',checkRole("admin"),usersList)
router.delete('/deleteuser/:id',checkRole("admin"),deleteUser)

module.exports = router