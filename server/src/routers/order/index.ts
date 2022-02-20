import { HTTPOrderController, OrderService, OredrRepository  } from '../../modules/Order';
import { ProductRepository, ProductService } from '../../modules/Product';
import { Router } from 'express';
import { UserRepository } from '../../modules/User';

const userRepo = new UserRepository();

const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);

const orderRepo = new OredrRepository();
const orderService = new OrderService(orderRepo, userRepo, productService);
const controller = new HTTPOrderController(orderService);

const router = Router();

router.get('/order/:user', (req, res) => controller.getByUser(req, res));
router.post('/order', (req, res) => controller.order(req, res));

export default router;
