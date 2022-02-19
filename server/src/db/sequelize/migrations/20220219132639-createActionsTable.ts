import { QueryInterface } from 'sequelize';
import Action from 'modules/Action/model';


export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      try {
        queryInterface.createTable(Action.tableName, Action.getAttributes());
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
        queryInterface.dropTable(Action.tableName, Action.getAttributes());
        transaction.commit();
      } catch (error) {
        console.log('Can\'t finish transaction because error occured', error);
        transaction.rollback();
      }
    }
  )
};