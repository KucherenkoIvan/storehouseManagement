import { IAction } from './model';
import { IActionRepository } from './repository';
import { IRepository } from 'types/IRepository';
import { IRole } from '../Role';

export interface IActionService {
  create (role: IAction['role'], resource: IAction['resource'], type: IAction['type']): Promise<void>;
  isAllowed (role: IAction['role'], resource: IAction['resource'], type: IAction['type']): Promise<boolean>;
}

export class ActionService implements IActionService {
  private readonly _actionRepo: IActionRepository;
  private readonly _roleRepo: IRepository<IRole>;

  constructor(actionRepo: IActionRepository, roleRepo: IRepository<IRole>) {
    this._actionRepo = actionRepo;
    this._roleRepo = roleRepo;
  }

  async create(role: number, resource: string, type: string): Promise<void> {
    const isRoleExists = await this._roleRepo.exists('id', role);
    if (!isRoleExists) {
      throw new Error('Role not found');
    }

    await this._actionRepo.save(role, resource, type);
  }

  async isAllowed(role: number, resource: string, type: string): Promise<boolean> {
    const isRoleExists = await this._roleRepo.exists('id', role);
    if (!isRoleExists) {
      throw new Error('Role not found');
    }

    const permission = await this._actionRepo.find(role ,resource, type);

    return Boolean(permission);
  }

}
