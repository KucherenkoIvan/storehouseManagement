import config from '../../config';

interface IConnectionConfig {
  username: string;
  password?: string;
  database: string;
  host: string;
  dialect: string;
}

interface ISequelizeConfig {
  development?: IConnectionConfig;
  production?: IConnectionConfig;
}

const sequelizeConfig: ISequelizeConfig = {
  [config.NODE_ENV]: {
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: 'postgresql'
  }
};

export default sequelizeConfig;
