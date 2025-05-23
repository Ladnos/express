import { Sequelize } from "sequelize";

import config from './src/config/config'
type Environment = 'development' | 'test' | 'production'; 

const env = (process.env.NODE_ENV as Environment) || 'development';

if (!config[env]) {
  throw new Error(`No config found for environment: ${env}`);
}

const sequelize = new Sequelize({
  ...config[env]
});
export default sequelize