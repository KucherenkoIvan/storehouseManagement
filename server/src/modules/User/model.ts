import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import Role from '../Role/model';
import db from '../../db';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare login: string;
  declare password: string;
  declare role: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement:true,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: Role['id'],
  }
}, {
  tableName: 'Users',
  sequelize: db,
});

export default User;
