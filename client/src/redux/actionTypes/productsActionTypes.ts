import { ProductInfo } from "../reducers/productsReducer";

export enum ProductActionTypes {
  PRODUCT_SETALL = 'PRODUCT/SETALL',
  PRODUCT_LOADING = 'PRODUCT/LOADING',  
  PRODUCT_ERROR = 'PRODUCT/ERROR',  
}

export interface ProductErrorActionPayload {
  error: string;
}

export interface ProductLoadingAction {
  type: ProductActionTypes.PRODUCT_LOADING;
}

export interface ProductErrorAction {
  type: ProductActionTypes.PRODUCT_ERROR;
  payload: ProductErrorActionPayload;
}

export interface ProductSetallAction {
  type: ProductActionTypes.PRODUCT_SETALL;
  payload: ProductInfo[];
}

export type ProductAction = ProductLoadingAction | ProductErrorAction | ProductSetallAction;
