import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './shared/routes';

// Redux imports
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import rootReducer from './shared/rootReducer.js';

// Middleware for async actions
import promiseMiddleware from './shared/lib/promiseMiddleware';
import immutifyState from './shared/lib/immutifyState';

//Styling
import { StyleSheet } from 'aphrodite/no-important'

const history = browserHistory;

/**
 * We hydrate/initialize the store with the state passed from the server.
 */
const initialState = immutifyState(window.__INITIAL_STATE__);

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
<Provider store={store}>
<Router children={routes} history={history} />
</Provider>,
  document.getElementById('app')
);



