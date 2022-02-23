import { Dispatch } from 'redux';
import { ProductAction, ProductActionTypes } from '../actionTypes/productsActionTypes';
import { ProductInfo } from '../reducers/productsReducer';

export const getAllProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_LOADING
    });

    try {
      const res = await fetch(`api/product/`, {
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
        type: ProductActionTypes.PRODUCT_SETALL,
        payload: data
      });

    } catch(error) {
      dispatch({
        type: ProductActionTypes.PRODUCT_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}

export const updateProduct = (productData: ProductInfo) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_LOADING
    });

    try {
      await fetch(`api/product/`, {
        method: 'PATCH',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      const updateProducts = await getAllProducts();
      updateProducts(dispatch);

    } catch(error) {
      dispatch({
        type: ProductActionTypes.PRODUCT_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}

export const createProduct = (productData: Omit<ProductInfo, 'id'>) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_LOADING
    });

    try {
      await fetch(`api/product/`, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      const updateProducts = await getAllProducts();
      updateProducts(dispatch);

    } catch(error) {
      dispatch({
        type: ProductActionTypes.PRODUCT_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}

export const deleteProduct = (id: ProductInfo['id']) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_LOADING
    });

    try {
      await fetch(`api/product/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updateProducts = await getAllProducts();
      updateProducts(dispatch);

    } catch(error) {
      dispatch({
        type: ProductActionTypes.PRODUCT_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}

