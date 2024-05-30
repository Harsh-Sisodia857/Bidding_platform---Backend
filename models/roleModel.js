module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'user_roles',
      as: 'users',
      foreignKey: 'roleId'
    });
  };

  return Role;
};
