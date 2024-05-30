const db = require('../models');
const Bid = db.Bid;

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('placeBid', async (data) => {
      try {
        const { amount, itemId, userId } = data;
        const bid = await Bid.create({ amount, itemId, userId });
        io.emit('newBid', bid); // Notify all clients
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
