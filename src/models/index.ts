'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import sequelize from '../../database';
import process from 'process';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import colors from 'colors';
const db: any = {};


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.testDbConnection = async  () => {
  try {
    await sequelize.authenticate();
    console.log(colors.bgBlue('Connection has been established successfully.'));
    return true
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false
  }
}

export default db;
