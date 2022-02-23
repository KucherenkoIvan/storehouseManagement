import { ActionRepository, ActionService } from '../../modules/Action';
import { HttpProductController, ProductRepository, ProductService } from '../../modules/Product';
import { Request, Response, Router } from 'express';
import { HttpError } from '../../types/HttpError';
import { RoleRepository } from '../../modules/Role';
import config from '../../config';
import jwt from 'jsonwebtoken';

type Middleware =  (req: Request, res: Response, next: () => void) => Promise<void>

const productRepo = new ProductRepository();
const producService = new ProductService(productRepo);
const controller = new HttpProductController(producService);

const roleRepo = new RoleRepository();
const actionRepo = new ActionRepository();
const actionService = new ActionService(actionRepo, roleRepo);


function createMiddleware(resource: string, action: string): Middleware {
  return async (req: Request, res: Response, next: () => void) => {
    const authCookie = req.cookies?.auth;
    let decoded, role;
    try {
      decoded = await jwt.verify(authCookie, config.JWT_SECRET);
      role = Number(decoded.role);
      res.cookie('auth', authCookie);
    } catch (error) {
      throw new HttpError(res, 'Not authorized', 401);
    }


    const isAllowed = await actionService.isAllowed(role, resource, action);

    if (isAllowed) {
      next();
    } else {
      throw new HttpError(res, 'Action is not allowed', 403);
    }

  };
}

const router = Router();

router.get('/product',
  (req, res) => controller.read(req, res)
);

router.delete('/product/:id',
  createMiddleware('product', 'delete'),
  (req, res) => controller.delete(req, res)
);

router.post('/product',
  createMiddleware('product', 'create'),
  (req, res) => controller.create(req, res)
);

router.patch('/product',
  createMiddleware('product', 'update'),
  (req, res) => controller.update(req, res)
);

export default router;
