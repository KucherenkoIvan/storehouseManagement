import { IOrder } from './model';
import { IOrderRepository } from './repository';
import { IProductService } from '../../modules/Product';
import { IUserRepository } from '../../modules/User';

export interface IOrderService {
  order (productId: IOrder['product'], userId: IOrder['user'], amount: IOrder['amount']): Promise<void>;
  getUserOrders (user: IOrder['user']): Promise<IOrder[]>;
}

export class OrderService implements IOrderService {
  private readonly _orderRepo: IOrderRepository;
  private readonly _userRepo: IUserRepository;
  private readonly _productService: IProductService;

  constructor(orderRepo: IOrderRepository, userRepo:  IUserRepository, productService: IProductService) {
    this._orderRepo = orderRepo;
    this._userRepo = userRepo;
    this._productService = productService;
  }

  async order (productId: number, userId: number, amount: number): Promise<void> {
    const product = await this._productService.getById(productId);
    if (!product) {
      throw new Error('Product does not exist');
    }

    const isUserExists = await this._userRepo.exists('id', userId);
    if (!isUserExists) {
      throw new Error('User does not exist');
    }

    if (amount > product.amount) {
      throw new Error('Invalid amount');
    }

    let needToRollback = false;
    try {
      await this._productService.update(
        product.id,
        product.amount - amount,
        product.description,
        product.name,
        product.price
      );
      needToRollback = true;

      await this._orderRepo.save(productId, userId, amount);

    } catch (error) {
      if (needToRollback) {
        await this._productService.update(
          product.id,
          product.amount,
          product.description,
          product.name,
          product.price
        );
      }
      console.log('saved');

      throw error;
    }

  }

  async getUserOrders(user: number): Promise<IOrder[]> {
    const isUserExists = this._userRepo.exists('id', user);
    if (!isUserExists) {
      throw new Error('User does not exist');
    }

    const orders = await this._orderRepo.findByUser(user);

    return orders;
  }

}
