const db = require('../models');
const Bid = db.Bid;

exports.createBid = async (req, res) => {
  try {
    const { amount, itemId, userId } = req.body;
    const bid = await Bid.create({ amount, itemId, userId });
    res.status(201).send(bid);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getBidsByItem = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { itemId: req.params.itemId } });
    res.status(200).send(bids);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
