import Role, { IRole } from './model';
import { IRepository } from '../../types/IRepository';

export interface IRoleRepository extends IRepository<IRole> {
  save (name: IRole['name']): Promise<void>;
  find (name: Role['name']): Promise<IRole | null>;
  getAll (): Promise<IRole[]>;
}

export class RoleRepository implements IRoleRepository {
  async exists(field: keyof IRole, value: string | number): Promise<boolean> {
    const role = await Role.findOne({ where: { [field]: value } });

    return Boolean(role);
  }

  async save (name: Role['name']): Promise<void> {
    await Role.create({ name });
  }

  async find (name: Role['name']): Promise<Role | null> {
    const role = await Role.findOne({ where: { name } });

    return role || null;
  }

  async getAll(): Promise<Role[]> {
    const roles = await Role.findAll();

    return roles;
  }
}
