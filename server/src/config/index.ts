import dotenv from 'dotenv';
import fs from 'fs';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const path = `../env/${NODE_ENV}.env`;

const isEnvFileExist = fs.existsSync(path);

if (!isEnvFileExist) {
  throw new Error(`Can't read env file because it not exists (path: ${path})`);
}

const { parsed } = dotenv.config({ path });

export default parsed;
