import { Request, Response } from 'express';
import { HttpError } from '../../types/HttpError';
import { IProduct } from './model';
import { IProductService } from './service';

export class HttpProductController {
  private readonly _productService: IProductService;

  constructor (producService: IProductService) {
    this._productService = producService;
  }

  async create (req: Request, res: Response): Promise<void> {
    const { amount, description, name, price }: IProduct = req.body;

    try {
      await this._productService.create(amount, description, name, price);
      res.status(200).end();
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }

  async read (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      if (id) {
        const product = await this._productService.getById(Number(id));
        res.json(product);
      } else {
        const products = await this._productService.getAll();
        res.json(products);
      }
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    const { id, amount, description, name, price }: IProduct = req.body;

    try {
      await this._productService.update(id, amount, description, name, price);
      res.status(200).end();
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this._productService.delete(Number(id));
      res.status(200).end();
    } catch (error) {
      new HttpError(res, error.message, 500);
    }
  }
}