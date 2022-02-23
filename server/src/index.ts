import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './db';
import express from 'express';
import rootRouter from './routers';
import { seed } from './db/seed';

function startServer() {
  const app = express();

  app.use(cors());
  app.options('*', cors);

  app.use(express.json());
  app.use(cookieParser());
  app.use(rootRouter);

  const port = 5000;

  app.listen(port, () => {
    console.log('Server started on port', port);
  });
}

db.sync({ force: true })
  .then(seed)
  .then(startServer);
