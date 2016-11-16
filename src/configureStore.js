import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './rootReducer';

// This lets us use Redux Dev Tools
const composeEnhancers = composeWithDevTools(
    // This version uses remote dev tools for server-side rendering. Open the link in a browser
    { hostName: `http://remotedev.io/local/`});

    // This version lets you use the chrome extension locally
    /*process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify here name, actionsBlacklist, actionsCreators and other options
        }) : compose;*/

// We just wrap applyMiddleware in the enhancer instead of putting applyMiddleware directly in the reducer
const enhancer = composeEnhancers(
    applyMiddleware(thunk, promiseMiddleware()),
    // other store enhancers if any
);

// Create and return store
const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    //applyMiddleware(thunk)
      enhancer
  );
};

export default configureStore;