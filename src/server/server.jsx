import express from 'express';
import React from 'react';

// Need to render to string on server and to send string to client
import { renderToString } from 'react-dom/server'

// Routes and History, can also maybe use react-router to handle history
import { RouterContext, match } from 'react-router';
import createHistory from 'history/createMemoryHistory';
import routes from '../shared/routes';

// Redux Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';

// Middleware for async actions + applyMiddleware import from 'redux'
import promiseMiddleware from 'lib/promiseMiddleware';

// Handles State Rehydration
import fetchComponentData from 'lib/fetchComponentData';

const app = express();
const history = createHistory();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  const location = history.location;
  const reducer  = combineReducers(reducers);

  // Async middleware applied same as in client except without initialState
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');

    /**
     * We create a new instance of a Redux store on every request, and inject that through the component tree
     * (available as <component>.context.redux, if you ever want to access it directly)
     * by wrapping the root component in Provider.
     */
    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      // We’ll also want to pass an initial state to the client, so it can hydrate its stores.
      const initialState = store.getState();

      const componentHTML = renderToString(InitialView);

      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Isomorphic Redux Demo</title>

            <!-- This sends the state to the client -->
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
              </script>
          </head>
          <body>
            <div id="react-view">${componentHTML}</div>
            <script type="application/javascript" src="/bundle.js"></script>
          </body>
      </html>
    `;
      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
