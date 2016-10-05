import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Home from 'components/TodosHome/TodosHome.jsx'

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={Home} />
  </Route>
);
