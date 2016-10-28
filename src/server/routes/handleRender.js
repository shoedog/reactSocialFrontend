import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from '../../configureStore';
import ReactDOMServer from 'react-dom/server';
import routes from '../../routes';

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
  };
  console.log('>>>>>>>> navigator.userAgent')
  console.log(navigator.userAgent)
  const muiTheme = getMuiTheme({userAgent: req.headers['user-agent']});

  // Async middleware applied same as in client except without initial State
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

export default render;

