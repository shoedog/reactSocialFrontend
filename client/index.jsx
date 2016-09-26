import React       from 'react';
import { render }  from 'react-dom';
import { Router, browserHistory, useRouterHistory }  from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import routes      from '../shared/routes';

//Redux imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';

// Middleware for async actions
import promiseMiddleware   from 'lib/promiseMiddleware';
import immutifyState        from 'lib/immutifyState';

const history = browserHistory;

const initialState = immutifyState(window.__INITIAL_STATE__);

const reducer = combineReducers(reducers);

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
/*Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });*/

//Async Middleware applied here
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

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