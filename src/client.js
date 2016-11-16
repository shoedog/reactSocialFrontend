import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import routes from './routes'
import configureStore from './configureStore';

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
render(
  <MuiThemeProvider muiTheme={ getMuiTheme({lightBaseTheme, userAgent: navigator.userAgent}) }>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
