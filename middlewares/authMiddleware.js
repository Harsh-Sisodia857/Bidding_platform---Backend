const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.verifyToken = (req, res, next) => {
  const token = req.headers['token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
      return;
    }
  }

  res.status(403).send({ message: 'Require Admin Role!' });
};
