const express = require("express")
const router = express.Router()

router.use('/auth', requier('./authRoutes.js'))
router.use('/items', requier('./itemRoutes.js'))
router.use('/bids', requier('./bidRoutes.js'))

module.exports = router;