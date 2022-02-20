import { Router } from 'express';
import orderRouter from './order';
import productRouter from './product';
import roleRouter from './role';
import userRouter from './user';

const rootRouter = Router();

rootRouter.use(
  '/api',
  roleRouter,
  userRouter,
  orderRouter,
  productRouter
);

export default rootRouter;
