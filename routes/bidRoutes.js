const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.post('/', [authMiddleware.verifyToken, roleMiddleware.isBidder], bidController.createBid);
router.get('/item/:itemId', bidController.getBidsByItem);

module.exports = router;
