import { QueryInterface } from 'sequelize';
import Product from 'modules/Product/model';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      try {
        queryInterface.createTable(Product.tableName, Product.getAttributes());
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
        queryInterface.dropTable(Product.tableName, Product.getAttributes());
        transaction.commit();
      } catch (error) {
        console.log('Can\'t finish transaction because error occured', error);
        transaction.rollback();
      }
    }
  )
};