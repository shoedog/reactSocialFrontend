import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(
  thunk
  // loggerMiddleware
)(createStore);

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );

  /*if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');

      store.replaceReducer(nextRootReducer);
    });
  }*/

  return store;
};

export default configureStore;