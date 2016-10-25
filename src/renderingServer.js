import express from 'express';
import React from 'react';
// import axoios from 'axios';
// import serialize from 'serialize-javascript';
// import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
// import compression from 'compression';
import fs from 'fs';
import rootReducer from './reducers/rootReducer';
import routes from './routes';
import promiseMiddleware from './lib/promiseMiddleware';
// import fetchComponentData from './lib/fetchComponentData';
// import renderHTML from './renderHTML';

// API server
// const API_PORT = process.env.API_PORT || 3001;
// const API_HOST = process.env.API_HOST || '0.0.0.0';
// const targetUrl = `http://${API_HOST}:${API_PORT}`;

const app = express();
app.use(express.static('public/static/dist'));

// const history = createMemoryHistory();

app.use((req, res) => {
  // See react-router docs: match() for documentation
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      return res.status(404).end('Not found.');
    } else {
      /* const reducer = rootReducer;

      // Async middleware applied same as in client except without initialState
      const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

      const componentHTML = ReactDOM.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const initialState = store.getState();

      res.send(renderHTML(componentHTML, initialState));*/
      handleRender(res, renderProps);
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

function handleRender(res, renderProps) {
   // Async middleware applied same as in client except without initialState
  const store = applyMiddleware(promiseMiddleware)(createStore)(rootReducer);

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
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
