import { HttpRoleController, RoleRepository, RoleService } from '../../modules/Role';
import { Router } from 'express';

const repo = new RoleRepository();
const service = new RoleService(repo);
const controller = new HttpRoleController(service);

const router = Router();

router.get('/role/:name', async (req, res) => controller.getRole(req, res));

export default router;
