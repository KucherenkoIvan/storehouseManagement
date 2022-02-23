import { Dispatch } from 'redux';
import { getAllProducts } from './productsActionCreators';
import { OrderAction, OrderActionTypes } from '../actionTypes/orderActionTypes';

export const getAllOrders = (id: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({
      type: OrderActionTypes.ORDER_LOADING
    });

    try {
      const res = await fetch(`api/order/${id}`, {
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }


      dispatch({
        type: OrderActionTypes.ORDER_SETALL,
        payload: data
      });

    } catch(error) {
      dispatch({
        type: OrderActionTypes.ORDER_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}

export const orderProduct = (user: number, product: number, amount: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({
      type: OrderActionTypes.ORDER_LOADING
    });

    try {
      await fetch(`api/order/`, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          product,
          amount
        })
      });

      const updateProducts = await getAllProducts();
      updateProducts(dispatch as any);

    } catch(error) {
      dispatch({
        type: OrderActionTypes.ORDER_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}
