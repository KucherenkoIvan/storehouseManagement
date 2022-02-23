import { ProductAction, ProductActionTypes, ProductErrorAction, ProductSetallAction } from "../actionTypes/productsActionTypes"

export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
}

interface ProductsState {
  products: ProductInfo[],
  isLoading: boolean,
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null
}

function loading(): ProductsState {
  return { ...initialState, isLoading: true };
}

function error(action: ProductErrorAction): ProductsState {
  return { ...initialState, ...action.payload };
}

function setAll(action: ProductSetallAction): ProductsState {
  return { products: action.payload,  isLoading: false, error: null };
}

const orderReducer = (state: ProductsState = initialState, action: ProductAction) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LOADING:
      return loading();
    case ProductActionTypes.PRODUCT_ERROR:
      return error(action as ProductErrorAction);
    case ProductActionTypes.PRODUCT_SETALL:
      return setAll(action as ProductSetallAction);
    default: return state;
  }
}

export default orderReducer;
