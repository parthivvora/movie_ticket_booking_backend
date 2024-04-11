const express = require('express')
const { userRegister, userLogin } = require('../controllers/user.controller')
const { addContactInformation } = require('../controllers/contact.controller')
const { addSubscribeDetails } = require('../controllers/subscribe.controller')
const router = express()

// User
router.post('/register', userRegister)
router.post('/login', userLogin)

// Contact
router.post('/add-contact-information', addContactInformation)

// Subscribe
router.post('/add-subscribe', addSubscribeDetails)

module.exports = router