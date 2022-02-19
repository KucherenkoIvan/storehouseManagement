import dotenv from 'dotenv';
import fs from 'fs';

export interface IAppConfig {
  NODE_ENV: string;
  DB_PASSWORD: string;
  DB_USER: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_HOST: string;
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = `../env/${NODE_ENV}.env`;

const isEnvFileExists = fs.existsSync(path);

if (!isEnvFileExists) {
  throw new Error(`Can't read env file because it not exists (path: ${path})`);
}

const { parsed } = dotenv.config({ path });

const config: IAppConfig = {
  NODE_ENV,
  DB_PASSWORD: parsed.DB_PASSWORD,
  DB_USER: parsed.DB_USER,
  DB_PORT: Number(parsed.DB_PORT),
  DB_NAME: parsed.DB_NAME,
  DB_HOST: parsed.DB_HOST
};

export default config;
