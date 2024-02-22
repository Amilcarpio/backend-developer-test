const { sequelize } = require('../src/models/sequelizeConfig.js');
const seedData = require('./dataSeeder.js');

async function syncDatabase(force) {
    try {
        console.log('===========syncDatabase      #Starting');
        if (force) {
            await sequelize.sync({ force: true });
        } else {
            await sequelize.sync({ alter: true });
        }
        await seedData();
        console.log('===========syncDatabase      #Data synced successfuly');
    } catch (error) {
        console.log('error' + error);
    }
}

module.exports = syncDatabase;
