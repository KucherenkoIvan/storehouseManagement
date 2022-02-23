import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../redux/reducers';
import { getAllProducts, updateProduct, createProduct, deleteProduct } from '../redux/actionCreators/productsActionCreators';

export const useProductActions = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const error = useSelector((state: RootState) => state.products.error);
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  
  const dispatch = useDispatch();

  const getAll = useCallback(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const update = useCallback((id, name, description, price, amount) => {
    dispatch(updateProduct({ id, name, description, price, amount }));
  }, [dispatch]);

  const create = useCallback((name, description, price, amount) => {
    dispatch(createProduct({ name, description, price, amount }));
  }, [dispatch]);

  const remove = useCallback((id) => {
    dispatch(deleteProduct(id));
  }, [dispatch]);

  return { products, error, isLoading, getAll, create, update, remove  };
}