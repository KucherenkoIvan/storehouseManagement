import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../../db';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  amount: number;
  price: number;
}

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> implements IProduct {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare amount: number;
  declare price: number;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: 'Products',
  sequelize: db
});

db.define(Product.tableName, Product.getAttributes());

export default Product;
