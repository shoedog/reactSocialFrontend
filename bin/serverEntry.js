import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { applyMiddleware, createStore } from 'redux';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import promiseMiddleware from './lib/promiseMiddleware';

function handleRender(res, renderProps) {
   // Async middleware applied same as in client except without initialState
  const store = applyMiddleware(promiseMiddleware)(createStore)(rootReducer);

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  fs.readFile('./index.html', 'utf8', function (err, file) {
    if (err) {
      return console.log(err);
    }
    const document = file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
    res.send(document);
  });
}

export default handleRender;
