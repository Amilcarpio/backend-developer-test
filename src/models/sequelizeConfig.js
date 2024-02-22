const Sequelize = require('sequelize');
const config = require('../../database/config/config.js');

const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
  host: 'postgres_srv',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.log('Unable to connect to the database:', error);
  });

const CompanyModel = require('./company.js');
const JobModel = require('./job.js');

const Company = CompanyModel(sequelize);
const Job = JobModel(sequelize);

function associateModels() {
  const models = { Company, Job };
  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));
}

associateModels();

module.exports = { sequelize, Company, Job };
