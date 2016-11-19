import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from '../../src/configureStore';
import { renderToString } from 'react-dom/server';
import routes from '../../src/routes';
import setMuiTheme from '../setMuiTheme';

/**
 * render()
 *  Main render controller called from index.js
 *  Calls match() from react-router then passes control to handleRender()
 * @param req
 * @param res
 * @param next
 */
function render(req, res, next) {
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

/**
 * handleRender(req, res, renderProps)
 *  Initializes rendering of React-Redux, & Material-UI
 *    - sets navigator and muiTheme for material-ui
 *    - creates initial store
 *    - creates initial html with renderToString
 *    - fills any state with store.getState()
 *    - calls renderFullPage(html, state) to send assets and rendered output to client
 * @param req
 * @param res
 * @param renderProps
 */
function handleRender(req, res, renderProps) {
  global.navigator = {
    userAgent: req.headers['user-agent']
  };
  const muiTheme = setMuiTheme(req.headers['user-agent']);

  const store = configureStore();
  const html = renderToString(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    </MuiThemeProvider>
  );
  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

/**
 * renderFullPage(html, preloadedState)
 * HTML template string with:
 *  - injected html -> <Material-UI><Provider><Router/></Provider></Material-UI>
 *  - preloaded state
 *  - client & css bundles
 *  - other assets
 * @param html
 * @param preloadedState
 * @returns {string}
 */
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

