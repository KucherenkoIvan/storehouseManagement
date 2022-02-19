import { QueryInterface } from 'sequelize';
import Role from 'modules/Role/model';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      try {
        queryInterface.createTable(Role.tableName, Role.getAttributes());
        transaction.commit();
      } catch (error) {
        console.log('Can\'t finish transaction because error occured', error);
        transaction.rollback();
      }
    }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      try {
        queryInterface.dropTable(Role.tableName, Role.getAttributes());
        transaction.commit();
      } catch (error) {
        console.log('Can\'t finish transaction because error occured', error);
        transaction.rollback();
      }
    }
  )
};