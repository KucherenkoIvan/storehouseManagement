import { ActionRepository, ActionService } from '../modules/Action';
import { IProduct, ProductRepository, ProductService } from '../modules/Product';
import { RoleRepository, RoleService } from '../modules/Role';
import { UserRepository, UserService } from '../modules/User';

export async function seed() {
  const roleRepo = new RoleRepository();
  const roleService = new RoleService(roleRepo);

  await roleService.createRole('admin');
  await roleService.createRole('user');

  const userRepo = new UserRepository();
  const userService = new UserService(userRepo, roleRepo);

  const adminRole = await roleService.findRoleByName('admin');
  const userRole = await roleService.findRoleByName('user');

  await userService.register('admin', 'password', adminRole.id);
  await userService.register('user', 'password', userRole.id);

  const productRepo = new ProductRepository();
  const producService = new ProductService(productRepo);

  const products: Omit<IProduct, 'id'>[] = [
    {
      name: 'Product 1',
      amount: 100,
      price: 100,
      description: 'cool product #1'
    },
    {
      name: 'Product 2',
      amount: 200,
      price: 10,
      description: 'cool product #2'
    },
    {
      name: 'Product 3',
      amount: 500,
      price: 1100,
      description: 'cool product #3'
    },
    {
      name: 'Product 4',
      amount: 1,
      price: 10_000,
      description: 'cool product #4'
    }
  ];

  products.forEach(async product => {
    const { amount, name, price, description } = product;
    await producService.create(amount, description, name, price);
  });

  const actionRepo = new ActionRepository();
  const actionService = new ActionService(actionRepo, roleRepo);

  await actionService.create(adminRole.id, 'product', 'create');
  await actionService.create(adminRole.id, 'product', 'read');
  await actionService.create(adminRole.id, 'product', 'update');
  await actionService.create(adminRole.id, 'product', 'delete');

  await actionService.create(userRole.id, 'product', 'read');

  console.log('Seeding finished');
}
