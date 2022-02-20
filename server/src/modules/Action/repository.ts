import Action, { IAction } from './model';
import { IRepository } from 'types/IRepository';

export interface IActionRepository extends IRepository<IAction> {
  save (role: IAction['role'], resource: IAction['resource'], type: IAction['type']): Promise<void>;
  find (role: IAction['role'], resource: IAction['resource'], type: IAction['type']): Promise<IAction | null>;
}

export class ActionRepository implements IActionRepository {
  async exists(field: keyof IAction, value: string | number): Promise<boolean> {
    const action = await Action.findOne({ where: { [field]: value } });

    return Boolean(action);
  }

  async save(role: number, resource: string, type: string): Promise<void> {
    await Action.create({ role, type, resource });
  }

  async find(role: number, resource: string, type: string): Promise<IAction | null> {
    const action = await Action.findOne({
      where: {
        role,
        resource,
        type
      }
    });

    return action || null;
  }

}
