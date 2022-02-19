import { QueryInterface } from 'sequelize';
import User from 'modules/User/model';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      try {
        queryInterface.createTable(User.tableName, User.getAttributes());
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
        queryInterface.dropTable(User.tableName, User.getAttributes());
        transaction.commit();
      } catch (error) {
        console.log('Can\'t finish transaction because error occured', error);
        transaction.rollback();
      }
    }
  )
};