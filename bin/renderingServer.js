import "babel-polyfill";
import express from 'express';
import React from 'react';
import axios from 'axios';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { compression } from 'compression';
import rootReducer from '../src/reducers/rootReducer';
import routes from '../src/routes';
import promiseMiddleware from '../src/lib/promiseMiddleware';
import fetchComponentData from '../src/lib/fetchComponentData';
import { StyleSheetServer } from 'aphrodite'
import { HOST, PORT, API_HOST, API_PORT, WEBPACK_URL } from '../tools/config';

process.env.BROWSER = false;
//API Server
const targetUrl = `http://${API_HOST}:${API_PORT}`;
const app = express();
const server = new http.Server(app);

//Set Proxy as API Server
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});

app.use('/', express.static(path.join(__dirname, '..', 'static')));

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

//Handle errors from API Server
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }
  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

const history = createMemoryHistory();

app.use((req, res) => {
  const css = new Set(); // CSS for all rendered React components
  const context = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())) };
  const reducer  = rootReducer;

  // Async middleware applied same as in client except without initialState
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  // See react-router docs: match() for documentation
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error(error);
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    if (!renderProps) return res.status(404).end('Not found.');

    //React Router Docs
    //res.status(200).send(renderToString(<RouterContext {...renderProps} />))

    /**
     * New Redux store on every request, and inject through component tree
     * (available as <component>.context.redux, if need access it directly)
     * by wrapping the root component in Provider.
     */
    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      // Initial state for client, so it can hydrate its stores.
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
                <style type="text/css">${[...css].join('')}</style>
          </head>
          <body>
            <div id="root">${componentHTML.html}</div>
            <script>window.renderedClassNames = ${JSON.stringify(componentHTML.css.renderedClassNames)};</script>
            <!-- This sends the state to the client -->
            <script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};</script>
            <script src=${ process.env.NODE_ENV === 'development' ?
              WEBPACK_URL + '/assets/bundle.js' : '/dist/client.js'}></script>
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


app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on: ${PORT}`);
  }
});
