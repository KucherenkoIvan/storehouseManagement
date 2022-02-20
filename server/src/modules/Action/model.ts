import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import Role from '../Role/model';
import db from '../../db';

export interface IAction {
  id: number,
  role: number,
  resource: string,
  type: string
}

class Action extends Model<InferAttributes<Action>, InferCreationAttributes<Action>> implements IAction {
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
    onDelete: 'cascade'
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

db.define(Action.tableName, Action.getAttributes());

export default Action;
