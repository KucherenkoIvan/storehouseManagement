import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize';
import User from 'modules/User/model';
import Product from 'modules/Product/model';
import db from '../../db';

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare user: number;
  declare product: number;
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: DataTypes.INTEGER,
    references: User['id'],
  },
  product: {
    type: DataTypes.INTEGER,
    references: Product['id'],
  }
}, {
  tableName: 'Orders',
  sequelize: db
});

console.log(typeof User['id']);

export default Order;
