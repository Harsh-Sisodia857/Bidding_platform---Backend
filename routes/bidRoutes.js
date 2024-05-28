const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bid.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');


router.post('/', [authMiddleware.verifyToken, roleMiddleware.isBidder], bidController.createBid);
router.get('/item/:itemId', bidController.getBidsByItem);

module.exports = router;
