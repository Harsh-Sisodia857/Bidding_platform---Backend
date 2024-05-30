const { validationResult } = require('express-validator');
const db = require('../models');
const Item = db.Item;

exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const item = await Item.create(req.body);
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'Item not found.' });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).send({ message: 'Item not found.' });
    }
    const updatedItem = await Item.findByPk(req.params.id);
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).send({ message: 'Item not found.' });
    }
    res.status(204).send({ message: 'Item deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
