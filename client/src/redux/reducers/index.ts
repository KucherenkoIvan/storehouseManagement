import { combineReducers } from "redux";
import authInfoReducer from "./authReducer";
import orderReducer from "./orderReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
  auth: authInfoReducer,
  products: productsReducer,
  orders: orderReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
