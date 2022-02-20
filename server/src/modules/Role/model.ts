import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import db from '../../db';

export interface IRole {
  id: number;
  name: string;
}

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> implements IRole {
  declare id: CreationOptional<number>;
  declare name: string;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Roles',
  sequelize: db
});

db.define(Role.tableName, Role.getAttributes());

export default Role;
