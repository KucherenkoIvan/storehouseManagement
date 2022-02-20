import Product, { IProduct } from './model';
import { IRepository } from '../../types/IRepository';

export interface IProductRepository extends IRepository<IProduct> {
  save (
    amount: IProduct['amount'],
    description: IProduct['description'],
    name: IProduct['name'],
    price: IProduct['price']
  ): Promise<void>;

  update (
    id: IProduct['id'],
    amount: IProduct['amount'],
    description: IProduct['description'],
    name: IProduct['name'],
    price: IProduct['price']
  ): Promise<void>;

  delete (id: IProduct['id']): Promise<void>;

  getAll (): Promise<IProduct[]>;

  getById (id: IProduct['id']): Promise<IProduct | null>;
}

export class ProductRepository implements IProductRepository {
  async save (amount: number, description: string, name: string, price: number): Promise<void> {
    await Product.create({ amount, description, name, price });
  }

  async update (id: number, amount: number, description: string, name: string, price: number): Promise<void> {
    await Product.update({ amount, description, name, price }, { where: { id } });
  }

  async delete (id: number): Promise<void> {
    await Product.destroy({ where: { id } });
  }

  async getAll (): Promise<IProduct[]> {
    const allProducts = await Product.findAll();

    return allProducts;
  }

  async getById (id: number): Promise<IProduct | null> {
    const product = await Product.findOne({ where: { id } });

    return product || null;
  }

  async exists (field: keyof IProduct, value: string | number): Promise<boolean> {
    const product = await Product.findOne({ where: { [field]: value } });

    return Boolean(product);
  }
}
