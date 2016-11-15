import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify here name, actionsBlacklist, actionsCreators and other options
        }) : compose;

const createStoreWithMiddleware = applyMiddleware(
  thunk
  // loggerMiddleware
)(createStore);

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

const configureStore = () => {
  const store = createStore(
    rootReducer,
    //initialState,
    //applyMiddleware(thunk)
      enhancer
  );

  return store;
};

export default configureStore;