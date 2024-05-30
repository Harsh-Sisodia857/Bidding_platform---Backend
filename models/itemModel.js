module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      startPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return Item;
  };
  