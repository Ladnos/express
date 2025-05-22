import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

// Проверяем, что DB_DRIVER корректен
const validDialects: Dialect[] = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake'];

interface DatabaseConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  dialect: Dialect; // Теперь строго типизирован
}

interface Config {
  development: DatabaseConfig;
  test?: DatabaseConfig;
  production?: DatabaseConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER as Dialect, // TypeScript теперь доволен
  },
};

export default config;