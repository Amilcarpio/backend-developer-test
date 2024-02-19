import Sequelize from 'sequelize';
import config from '../../database/config/config.js';

const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
    host: 'postgres_srv',
    dialect: 'postgres',
  });

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.log('Unable to connect to the database:', error);
}

import CompanyModel from './company.js';
import JobModel from './job.js';

const Company = CompanyModel(sequelize);
const Job = JobModel(sequelize);

function associateModels() {
  const models = { Company, Job };
  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));
}

associateModels();

export { sequelize, Company, Job };