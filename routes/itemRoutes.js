const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check, validationResult } = require('express-validator');

const validateItem = [
    check('name').notEmpty().withMessage('Name is required'),
    check('startPrice').isFloat({ gt: 0 }).withMessage('Start price must be a positive number'),
    // Add more validations as required
  ];
  

router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin, validateItem], itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin,validateItem], itemController.updateItem);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], itemController.deleteItem);

module.exports = router;
