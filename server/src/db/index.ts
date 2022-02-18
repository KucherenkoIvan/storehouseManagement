import config from '../config';
import { Sequelize } from 'sequelize';

const db = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres'
  }
);

export default db;
