const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');


router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], itemController.updateItem);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], itemController.deleteItem);

module.exports = router;
