import { Request, Response } from 'express';
import { HttpError } from '../../types/HttpError';
import { IOrder } from './model';
import { IOrderService } from './service';

export class HTTPOrderController {
  private readonly _orderService: IOrderService;

  constructor (orderService: IOrderService) {
    this._orderService = orderService;
  }

  async order(req: Request, res: Response): Promise<void> {
    const { user, product, amount }: IOrder = req.body;

    try {
      await this._orderService.order(product, user, amount);
      res.status(200).end();
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }

  async getByUser(req: Request, res: Response): Promise<void> {
    const { user } = req.params;

    try {
      const orders = await this._orderService.getUserOrders(Number(user));
      res.json(orders);
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }

}