const express = require("express")
const router = express.Router()

router.use('/auth', require('./authRoutes.js'))
router.use('/items', require('./itemRoutes.js'))
router.use('/bids', require('./bidRoutes.js'))

module.exports = router;