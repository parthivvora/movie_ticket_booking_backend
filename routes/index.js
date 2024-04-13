const express = require('express')
const router = express()

router.use('/admin', require("./admin.routes"))
router.use('/api', require("./client.routes"))

module.exports = router
