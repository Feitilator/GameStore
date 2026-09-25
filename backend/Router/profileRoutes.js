const { profile } = require('../Controller/profileController');
const { middleware } = require('../Middleware/Middleware');

const router = require('express').Router()

router.get('/me',middleware,profile)


module.exports = router