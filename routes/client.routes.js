const express = require('express')
const { userRegister } = require('../controllers/user.controller')
const router = express()

router.post('/register', userRegister)
// router.post('/login', require("./client.routes"))

module.exports = router