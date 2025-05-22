import { Sequelize } from "sequelize";

// const config = require(__dirname + '/config/config.js')[env];
import config from './src/config/config'
type Environment = 'development' | 'test' | 'production'; // добавьте нужные среды

const env = (process.env.NODE_ENV as Environment) || 'development';

if (!config[env]) {
  throw new Error(`No config found for environment: ${env}`);
}

const sequelize = new Sequelize({
  ...config[env]
});
export default sequelize