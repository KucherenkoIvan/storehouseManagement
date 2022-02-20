import { Request, Response } from 'express';
import { HttpError } from '../../types/HttpError';
import { IUserService } from './service';
import config from '../../config';
import jwt from 'jsonwebtoken';

export class HttpUserController {
  private readonly _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  private async createAuthHash(id: string, login: string, role: string) {
    const authHash = await jwt.sign(
      { id, login, role },
      config.JWT_SECRET,
      { expiresIn: '4h' }
    );

    return authHash;
  }

  async register(req: Request, res: Response) {
    const { login, password, role } = req.body;

    try {
      const { id } = await this._userService.register(login, password, role);

      const authHash = await this.createAuthHash(id.toString(), login, role.toString());

      res.cookie('auth', authHash, { maxAge: 4 * 60 * 60 }).json(authHash);
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }

  async authenticate(req: Request, res: Response) {
    const { login, password } = req.body;

    try {
      const { id, role } = await this._userService.authenticate(login, password);

      const authHash = await this.createAuthHash(id.toString(), login, role.toString());

      res.cookie('auth', authHash, {  maxAge: 4 * 60 * 60 }).json(authHash);
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }
}