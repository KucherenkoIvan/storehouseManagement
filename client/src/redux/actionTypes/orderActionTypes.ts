import { OrderInfo } from "../reducers/orderReducer";

export enum OrderActionTypes {
  ORDER_SETALL = 'ORDER/SETALL',
  ORDER_LOADING = 'ORDER/LOADING',  
  ORDER_ERROR = 'ORDER/ERROR',  
}

export interface OrderErrorActionPayload {
  error: string;
}

export interface OrderLoadingAction {
  type: OrderActionTypes.ORDER_LOADING;
}

export interface OrderErrorAction {
  type: OrderActionTypes.ORDER_ERROR;
  payload: OrderErrorActionPayload;
}

export interface OrderSetallAction {
  type: OrderActionTypes.ORDER_SETALL;
  payload: OrderInfo[];
}

export type OrderAction = OrderSetallAction | OrderErrorAction | OrderLoadingAction;
