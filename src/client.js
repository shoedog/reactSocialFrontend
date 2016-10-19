import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import configureStore from './configureStore';

import Root from './Containers/Root';

const history = browserHistory;

/**
 * We hydrate/initialize the store with the state passed from the server.
 */
const initialState = window.__INITIAL_STATE__ || {};

// Async and other middleware applied in store
const store = configureStore(initialState);

/**
 * Render
 * @param {Object} store - this applies the store
 * @param {Object} history - this applies the history
 */
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
