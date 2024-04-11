const express = require("express");
const { getContactInformation } = require("../controllers/contact.controller");
const { getSubscribeDetails } = require("../controllers/subscribe.controller");
const { adminLogin, getUserLists } = require("../controllers/admin.controller");
const router = express();

// Admin
router.post('/login', adminLogin)
router.get('/get-user-list', getUserLists)

// Contact
router.get('/get-contact-information', getContactInformation)

// Subscribe
router.get('/get-subscribe', getSubscribeDetails)

module.exports = router;
