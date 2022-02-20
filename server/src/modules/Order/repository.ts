import Order, { IOrder } from './model';
import { IRepository } from '../../types/IRepository';

export interface IOrderRepository extends IRepository<IOrder> {
  save (product: IOrder['product'], user: IOrder['user'], amount: IOrder['amount']): Promise<void>;

  findByUser (user: IOrder['user']): Promise<IOrder[]>;
}

export class OredrRepository implements IOrderRepository {
  async exists(field: keyof IOrder, value: number): Promise<boolean> {
    const order = await Order.findOne({ where: { [field]: value } });

    return Boolean(order);
  }

  async save(product: IOrder['product'], user: IOrder['user'], amount: IOrder['amount']): Promise<void> {
    await Order.create({ product, user, amount });
  }

  async findByUser(user: IOrder['user']): Promise<IOrder[]> {
    const orders = await Order.findAll({ where: { user } });

    return orders;
  }

}
