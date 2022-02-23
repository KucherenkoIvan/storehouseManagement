import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { orderProduct, getAllOrders } from "../redux/actionCreators/orderActionCreators";
import { RootState } from "../redux/reducers"

export const useOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const error = useSelector((state: RootState) => state.orders.error);
  const isLoading = useSelector((state: RootState) => state.orders.isLoading);
  const dispatch = useDispatch();

  const makeOrder = useCallback((id: number, product: number, amount: number) => {
    dispatch(orderProduct(id, product, amount));
  }, [dispatch]);

  const loadOrders = useCallback((id: number) => {
    dispatch(getAllOrders(id));
  }, [dispatch]);

  return { orders, error, isLoading, makeOrder, loadOrders };
}
