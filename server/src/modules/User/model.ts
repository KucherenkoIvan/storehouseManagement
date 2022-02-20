import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Role from '../Role/model';
import db from '../../db';

export interface IUser {
  id: number,
  login: string,
  password: string,
  role: number
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements IUser {
  declare id: CreationOptional<number>;
  declare login: string;
  declare password: string;
  declare role: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.INTEGER,
    references: Role['id'],
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'Users',
  sequelize: db,
});

db.define(User.tableName, User.getAttributes());

export default User;
