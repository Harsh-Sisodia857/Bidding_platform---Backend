const db = require('../models');
const User = db.User;

exports.isBidder = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
      return;
    }
  }

  res.status(403).send({ message: 'Require Bidder Role!' });
};
