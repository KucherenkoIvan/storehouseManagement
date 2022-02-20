import * as argon from 'argon2';
import { IRepository } from 'types/IRepository';
import { IRole } from 'modules/Role';
import { IUser } from './model';
import { IUserRepository } from './repository';
import config from '../../config';

export interface IUserService {
  register (login: IUser['login'], password: IUser['password'], role: IUser['role']): Promise<IUser>;
  authenticate (login: IUser['login'], password: IUser['password']): Promise<IUser>;
}

export class UserService implements IUserService {
  private readonly _userRepo: IUserRepository;
  private readonly _roleRepo: IRepository<IRole>;

  constructor(userRepo: IUserRepository, roleRepo:  IRepository<IRole>) {
    this._userRepo = userRepo;
    this._roleRepo = roleRepo;
  }

  async register (login: string, password: string, role: number): Promise<IUser> {
    if (login.length < 4) {
      throw Error('Login must be 4 characters or longer');
    }
    if (password.length < 6) {
      throw Error('Password must be 6 characters or longer');
    }

    const isRoleExists = await this._roleRepo.exists('id', role);
    if (!isRoleExists) {
      throw new Error('Specified role does not exist');
    }

    const userInDb = await this._userRepo.find(login);
    if (userInDb) {
      throw new Error('Login is alredy taken');
    }

    const passwordHash = await argon.hash(
      password,
      {
        salt: config.ARGON_SALT,
        secret: config.ARGON_SECRET
      }
    );

    await this._userRepo.save(login, passwordHash, role);

    const createdUser = await this._userRepo.find(login);

    return createdUser;
  }

  async authenticate (login: string, password: string): Promise<IUser> {
    const candidate = await this._userRepo.find(login);

    if (!candidate) {
      throw new Error('User not found');
    }

    const isPasswordMatch = await argon.verify(
      candidate.password,
      password,
      {
        salt: config.ARGON_SALT,
        secret: config.ARGON_SECRET
      }
    );

    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    return candidate;
  }
}
