const db = require('./models');

const initializeRoles = async () => {
  const roles = ['user', 'admin'];

  for (let role of roles) {
    await db.Role.findOrCreate({
      where: { name: role },
      defaults: { name: role }
    });
  }

  console.log('Roles initialized');
};

db.sequelize.sync({ force: false }).then(() => {
  initializeRoles().then(() => {
    console.log('Initialization complete');
    process.exit();
  }).catch(err => {
    console.error('Error initializing roles:', err);
    process.exit(1);
  });
});
