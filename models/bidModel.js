module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('bid', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return Bid;
  };
  