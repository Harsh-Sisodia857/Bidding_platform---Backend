const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./userModel')(sequelize, DataTypes);
db.Role = require('./roleModel')(sequelize, DataTypes);
db.Item = require('./itemModel')(sequelize, DataTypes);
db.Bid = require('./bidModel')(sequelize, DataTypes);

db.Role.belongsToMany(db.User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.User.belongsToMany(db.Role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.User.hasMany(db.Bid, { as: 'bids' });
db.Bid.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Item.hasMany(db.Bid, { as: 'bids' });
db.Bid.belongsTo(db.Item, { foreignKey: 'itemId', as: 'item' });

module.exports = db;