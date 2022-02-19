import { QueryInterface } from 'sequelize';
import Order from 'modules/Order/model';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      try {
        queryInterface.createTable(Order.tableName, Order.getAttributes());
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
        queryInterface.dropTable(Order.tableName, Order.getAttributes());
        transaction.commit();
      } catch (error) {
        console.log('Can\'t finish transaction because error occured', error);
        transaction.rollback();
      }
    }
  )
};