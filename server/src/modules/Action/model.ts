import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize';
import Role from '../Role/model';
import db from '../../db';

class Action extends Model<InferAttributes<Action>, InferCreationAttributes<Action>> {
  declare id: CreationOptional<number>;
  declare role: number;
  declare resource: string;
  declare type: string;
}

Action.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.INTEGER,
    references: Role['id'],
  },
  resource: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.ENUM('create', 'read', 'update', 'delete')
  }
}, {
  tableName: 'Actions',
  sequelize: db
});

export default Action;
