import { IProduct } from './model';
import { IProductRepository } from './repository';

export interface IProductService {
  create (
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

export class ProductService implements IProductService {
  private readonly _productRepo: IProductRepository;

  constructor(productRepo: IProductRepository) {
    this._productRepo = productRepo;
  }

  async create(amount: number, description: string, name: string, price: number): Promise<void> {
    if (amount < 0) {
      throw new Error('Amount must be more or equal 0');
    }

    if (!name.length) {
      throw new Error('Name must be non-empry string');
    }

    if (price < 0) {
      throw new Error('Price must be more or equal 0');
    }

    await this._productRepo.save(amount, description, name, price);
  }

  async update(id: number, amount: number, description: string, name: string, price: number): Promise<void> {
    if (amount < 0) {
      throw new Error('Amount must be more or equal 0');
    }

    if (!name.length) {
      throw new Error('Name must be non-empry string');
    }

    if (price < 0) {
      throw new Error('Price must be more or equal 0');
    }

    const canUpdate = await this._productRepo.exists('id', id);

    if (!canUpdate) {
      throw new Error('Value not exist');
    }

    await this._productRepo.update(id, amount, description, name, price);
  }

  async delete(id: number): Promise<void> {
    const canUpdate = await this._productRepo.exists('id', id);

    if (!canUpdate) {
      throw new Error('Value not exist');
    }

    await this._productRepo.delete(id);
  }

  async getAll(): Promise<IProduct[]> {
    const allProducts = await this._productRepo.getAll();

    return allProducts;
  }
  async getById(id: number): Promise<IProduct | null> {
    const product = await this._productRepo.getById(id);

    return product;
  }

}

