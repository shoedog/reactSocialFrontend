import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes';

// Redux imports
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import rootReducer from './reducers/rootReducer.js';

// Middleware for async actions
import promiseMiddleware from './lib/promiseMiddleware';
import immutifyState from './lib/immutifyState';

//Styling
import { StyleSheet } from 'aphrodite/no-important';

import Root from './containers/Root';

const history = browserHistory;

/**
 * We hydrate/initialize the store with the state passed from the server.
 */
const initialState = immutifyState(window.__PRELOADED_STATE__);

const reducer = rootReducer;

/**
 * Async Middleware applied here
 */
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

/**
 * Apply Styles for client
 */
StyleSheet.rehydrate(window.renderedClassNames);

/**
 * Render
 * @param {Object} store - this applies the store
 * @param {Object} routes - this applies the routes
 * @param {Object} history - this applies the history
 */
render(
<Root store={store} history={history}/>,
  document.getElementById('root')
);
