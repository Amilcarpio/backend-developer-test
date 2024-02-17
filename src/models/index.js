import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.resolve(__dirname, '../../database/config/config.json');
const configFile = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configFile);

const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

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
