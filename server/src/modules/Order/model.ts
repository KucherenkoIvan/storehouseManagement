import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Product from '../../modules/Product/model';
import User from '../../modules/User/model';
import db from '../../db';

export interface IOrder {
  id: number;
  user: number;
  product: number;
  amount: number;
}

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements IOrder {
  declare id: CreationOptional<number>;
  declare user: number;
  declare product: number;
  declare amount: number;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: DataTypes.INTEGER,
    references: User['id'],
    onDelete: 'cascade'
  },
  product: {
    type: DataTypes.INTEGER,
    references: Product['id'],
    onDelete: 'cascade'
  },
  amount: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'Orders',
  sequelize: db
});

db.define(Order.tableName, Order.getAttributes());

export default Order;
