import { OrderAction, OrderActionTypes, OrderErrorAction, OrderSetallAction } from "../actionTypes/orderActionTypes"

export interface OrderInfo {
  user: number;
  product: number;
  amount: number;
  createdAt?: string;
}

interface OrderState {
  orders: OrderInfo[],
  isLoading: boolean,
  error: string | null
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null
}
 
function loading(): OrderState {
  return { ...initialState, isLoading: true };
}

function error(action: OrderErrorAction): OrderState {
  return { ...initialState, ...action.payload };
}

function setAll(action: OrderSetallAction): OrderState {
  return { orders: action.payload,  isLoading: false, error: null };
}

const orderReducer = (state: OrderState = initialState, action: OrderAction) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_LOADING:
      return loading();
    case OrderActionTypes.ORDER_ERROR:
      return error(action as OrderErrorAction);
    case OrderActionTypes.ORDER_SETALL:
      return setAll(action as OrderSetallAction);
    default: return state;
  }
}

export default orderReducer;
