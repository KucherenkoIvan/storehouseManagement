import { IRole } from './model';
import { IRoleRepository } from './repository';

export interface IRoleService {
  createRole (name: IRole['name']): void;
  findRoleByName (name: IRole['name']): Promise<IRole | null>;
  getAllRoles (): Promise<IRole[]>;
}

export class RoleService implements IRoleService {
  private readonly _roleRepo: IRoleRepository;

  constructor(roleRepo: IRoleRepository) {
    this._roleRepo = roleRepo;
  }

  async createRole (name: IRole['name']): Promise<void> {
    if (name.length) {
      await this._roleRepo.save(name);
    } else throw new Error('Role name must be non-empty string');
  }

  async findRoleByName (name: IRole['name']): Promise<IRole> {
    const role = await this._roleRepo.find(name);

    return role;
  }

  async getAllRoles (): Promise<IRole[]> {
    const allRoles = await this._roleRepo.getAll();

    return allRoles;
  }
}
