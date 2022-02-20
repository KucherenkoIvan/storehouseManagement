import { HttpUserController, UserRepository, UserService } from '../../modules/User';
import { RoleRepository } from '../../modules/Role';
import { Router } from 'express';

const roleRepo = new RoleRepository();

const repo = new UserRepository();
const service = new UserService(repo, roleRepo);
const controller = new HttpUserController(service);

const router = Router();

router.post('/user/register', (req, res) => controller.register(req, res));
router.post('/user/auth', (req, res) => controller.authenticate(req, res));

export default router;
