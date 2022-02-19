import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare string: number;
}

export default Product;
