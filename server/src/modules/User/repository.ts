import User, { IUser } from './model';
import { IRepository } from '../../types/IRepository';

export interface IUserRepository extends IRepository<IUser> {
  save (login: IUser['login'], passwordHash: IUser['password'], roleId: IUser['role']): Promise<void>;
  find (login: IUser['login']): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  async exists(field: keyof IUser, value: string | number): Promise<boolean> {
    const user = await User.findOne({ where: { [field]: value } });

    return Boolean(user);
  }

  async save (login: IUser['login'], passwordHash: IUser['password'], roleId: IUser['role']): Promise<void> {
    await User.create({ login, password: passwordHash, role: roleId });
  }

  async getById(id: IUser['id']): Promise<IUser | null> {
    const user = await User.findOne({ where: { id } });

    return user || null;
  }

  async find (login: IUser['login']): Promise<User | null> {
    const user = await User.findOne({ where: { login } });

    return user || null;
  }
}
