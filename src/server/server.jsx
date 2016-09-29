import express from 'express';
import React from 'react';

//Axios is a promise based HTTP client we use for async requests
import axios from 'axios';

// Need to render to string on server and to send string to client
import { renderToString } from 'react-dom/server'

// Routes and History using react-router
import { createMemoryHistory, RouterContext, match } from 'react-router';
//import createHistory from 'history/createMemoryHistory';
import routes from '../shared/routes';

// Redux Imports
//
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../shared/rootReducer.js';

// Middleware for async actions + applyMiddleware import from 'redux'
import promiseMiddleware from 'lib/promiseMiddleware';

// Handles State Rehydration
import fetchComponentData from 'lib/fetchComponentData';

//Inline Styling
import { StyleSheetServer } from 'aphrodite'

const app = express();
const history = createMemoryHistory();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  const reducer  = rootReducer;

  // Async middleware applied same as in client except without initialState
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
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

      const componentHTML = StyleSheetServer.renderStatic(
        () => renderToString(InitialView)
      )
      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Isomorphic Redux Demo</title>
            <style>
                  html {
                    box-sizing: border-box
                  }
                  *,
                  *::before,
                  *::after {
                    box-sizing: border-box
                  }
                  html {
                    font-size: 100%;
                    -ms-overflow-style: scrollbar;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    height: 100%;
                  }
                  body {
                    font-size: 1rem;
                    background-color: #fff;
                    color: #555;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
                    margin: 0;
                  }
                  h1,h2,h3,h4,h5,h6 {
                    margin: 0;
                    padding: 0;
                  }
                </style>
                <style data-aphrodite>${componentHTML.css.content}</style>
          </head>
          <body>
            <div id="app">${componentHTML.html}</div>
            <script>window.renderedClassNames = ${JSON.stringify(componentHTML.css.renderedClassNames)};</script>
            <!-- This sends the state to the client -->
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
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
