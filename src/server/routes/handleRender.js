import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from '../../configureStore';
import ReactDOMServer from 'react-dom/server';
import routes from '../../routes';
import setMuiTheme from '../setMuiTheme';

function render(req, res, next) {
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
}

function handleRender(req, res, renderProps) {
  global.navigator = {
    userAgent: req.headers['user-agent']
    //console.log(`>>> navigator.userAgent: ${navigator.userAgent}`)
  };

  // For SSR we need to set the CSS/Theming of Components here
  const muiTheme = setMuiTheme(req.headers['user-agent']);

  // Async middleware applied same as in client except without initial State
  const store = configureStore();

  const html = ReactDOMServer.renderToString(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    </MuiThemeProvider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
/*  const strState = JSON.stringify(initialState);

  fs.readFile('./public/static/index.html', 'utf8', function (err, file) {
    if (err) {
      return console.log(err);
    }
    let document = file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
    document = document.replace(/<script text="initialState"><\/script>/, `<script>window.__INITIAL_STATE__ = ${strState}</script>`);
    if(process.env.NODE_ENV === 'development') {
      document = document.replace(
        /<script type="application\/javascript" src="\/client.js" async><\/script>/,
        `<script type="application/javascript" src="http://localhost:8000/client.js" async></script>`);
    }
    res.send(document);
  });*/
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Moonwalk</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="//cdn.materialdesignicons.com/1.2.65/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body style="margin:0">
    <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min.js"></script>
      <script type="application/javascript" src=${ process.env.NODE_ENV == 'development' ? "http://localhost:8000/client.js" : "/client.js"} async></script>
    </body>
    </html>
`
}

export default render;

