import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import routes from './routes';
import { Router } from 'react-router';
import configureStore from './configureStore';

const history = browserHistory;

/**
 * We hydrate/initialize the store with the state passed from the server.
 */
const preloadedState = window.__PRELOADED_STATE__;

// Async and other middleware applied in store
const store = configureStore(preloadedState);

/**
 * Render
 * @param {Object} store - this applies the store
 * @param {Object} history - this applies the history
 */
ReactDOM.render(
  <MuiThemeProvider muiTheme={ getMuiTheme({lightBaseTheme, userAgent: navigator.userAgent}) }>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
