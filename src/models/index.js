'use strict'

import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path';
import config from '../config/config.json'

const configSequelize = `${__dirname}++${config[env].database}`
const db = {}
const env = process.env.NODE_ENV || 'development'

let sequelize;
if (configSequelize.use_env_variable) {
  sequelize = new Sequelize(process.env[configSequelize.use_env_variable], configSequelize);
} else {
  sequelize = new Sequelize(configSequelize.database, configSequelize.username, configSequelize.password, configSequelize);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'); // Corrigindo uso de basename
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db