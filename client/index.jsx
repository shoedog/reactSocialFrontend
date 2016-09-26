import React       from 'react';
import { render }  from 'react-dom';
import { Router, browserHistory, useRouterHistory }  from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import routes      from '../shared/routes';

//Redux imports
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';

const history = browserHistory;

let initialState = window.__INITIAL_STATE__;

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });

const reducer = combineReducers(reducers);
const store   = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);

/*
 This is identical to the server Redux initialization,
 except that we hydrate the store with the state passed from the server.
 */