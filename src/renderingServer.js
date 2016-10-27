import express from 'express';
import httpProxy from 'http-proxy';
import HttpProxyRules from 'http-proxy-rules';
import http from 'http';
import fs from 'fs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import routes from './routes';
import promiseMiddleware from './lib/promiseMiddleware';
import configureStore from './configureStore';

const app = express();
const server = new http.Server(app);
app.use(express.static('public/static/dist'));
app.use('/static', express.static('/public/static'));

// Transform routes to target routes for proxy service
const proxyRules = new HttpProxyRules({
  rules: {
    '.*/feedItems': `http://0.0.0.0:5000/social/feed`
  },
  default: `http://0.0.0.0:5000`
});
const proxy = httpProxy.createProxy();

// Proxy error handling
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

// Api Proxy Requests
app.route('/feedItems')
  .get( (req, res) => {
    var target = proxyRules.match(req);
    if (target) {
      proxy.web(req, res, {target: target});
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.status(returnStatus).end('The request url and path did not match any resources');
      console.log('DDB Error: ' + req.err);
    }
  });

app.get(['/', '/login', '/about', '/stream', '/404'], (req, res) => {
  // See react-router docs: match() for documentation
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      return res.status(404).end('Not found.');
    } else {
      handleRender(req, res, renderProps);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server listening on: ${PORT}`);
});

function handleRender(req, res, renderProps) {
  global.navigator = {
    userAgent: req.headers['user-agent']
  };
  console.log('>>>>>>>> navigator.userAgent')
  console.log(navigator.userAgent)
  const muiTheme = getMuiTheme({userAgent: req.headers['user-agent']});
   // Async middleware applied same as in client except without initialState
  //const store = applyMiddleware(promiseMiddleware)(createStore)(rootReducer);
  const store = configureStore();

  const html = ReactDOMServer.renderToString(
    <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
    </MuiThemeProvider>
  );

  const initialState = store.getState();
  const strState = JSON.stringify(initialState);

  fs.readFile('./public/static/index.html', 'utf8', function (err, file) {
    if (err) {
      return console.log(err);
    }
    let document = file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
    document = document.replace(/<script text="initialState"><\/script>/, `<script>window.__INITIAL_STATE__ = ${strState}</script>`);
    res.send(document);
  });
}
