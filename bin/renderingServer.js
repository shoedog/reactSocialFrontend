import express from 'express';
import React from 'react';
import axios from 'axios';
import serializeJs  from 'serialize-javascript';
import http from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import ReactDOM from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { compression } from 'compression';
import rootReducer from '../src/reducers/rootReducer';
import routes from '../src/routes';
import promiseMiddleware from '../src/lib/promiseMiddleware';
import fetchComponentData from '../src/lib/fetchComponentData';
import { StyleSheetServer } from 'aphrodite'
import clientConfig from '../src/config';
import { getAssetsPaths, fetchComponentsData } from './utils';

//API server
const API_PORT = process.env.API_PORT || 3001;
const API_HOST = process.env.API_HOST || '0.0.0.0';
const targetUrl = `http://${API_HOST}:${API_PORT}`;

const app = express();
app.use('/static', express.static('public/static'));
//const server = new http.Server(app);

/*Set Proxy as API Server
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});



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
*/

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
    } else if (!renderProps) {
      return res.status(404).end('Not found.')
    } else {

      fetchComponentsData({
        dispatch   : store.dispatch,
        components : renderProps.components,
        params     : renderProps.params
      })
        .then(() => {
          const initialState = store.getState();

          const componentHTML = ReactDOM.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          const html = renderHTML({
            componentHTML,
            initialState,
            config : clientConfig
          });

          return { html };
        })
        .then(({ html }) => {
            res.end(html);
        })
        .catch(err => {
          console.log(err.stack);
          res.end(err.message);
        });
    }
  });
});

// We can add css assets and serve them with this, but the asset bundling in webpack might not work with css modules?
//<link rel="stylesheet" href="${config.staticUrl}/${getAssetsPaths().css}">

function renderHTML({ componentHTML, initialState, config }) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">            
            <title>Isomorphic Redux Demo</title>            
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">            
            <link rel="stylesheet" href="//cdn.materialdesignicons.com/1.2.65/css/materialdesignicons.min.css">
               
        </head>
        <body>
        <div id="root">${componentHTML}</div>
          <script type="application/javascript">
            window.__CONFIG__ = ${serializeJs(config, { isJSON: true })};
            window.__INITIAL_STATE__ = ${serializeJs(initialState, { isJSON: true })};
          </script>
          <script src="https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min.js"></script>
          <script type="application/javascript" src="${config.staticUrl}/${getAssetsPaths().js}"></script>
        </body>
        </html>
    `;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on: ${PORT}`);
  }
});
