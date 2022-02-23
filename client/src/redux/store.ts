import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

let enchancers = compose(
  applyMiddleware(thunk)
);

interface _Window extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
}

const _window = window as unknown as _Window;

let devTools = _window['__REDUX_DEVTOOLS_EXTENSION__']?.();

if (devTools) {
  enchancers = compose(
    enchancers,
    devTools
  );
}

const store = createStore(rootReducer, enchancers as StoreEnhancer);

export default store;
