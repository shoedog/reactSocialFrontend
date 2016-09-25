console.log('Hello World!');
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './views/App'
import { browserHistory, Router } from 'react-router';
import { routes } from './routes';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
import { Provider } from 'react-redux';

// Needed for material ui's tap functions.
injectTapEventPlugin();

// Combine reducers and create store.
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Combine react-browser history with redux
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('mount')
);
