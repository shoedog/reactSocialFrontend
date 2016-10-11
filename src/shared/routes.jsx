import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import TodosHome from 'components/TodosHome/TodosHome.jsx'
import LaunchPageHome from 'components/LaunchPage_Home/LaunchPageHome.jsx'

export default (
	<Route name="app" component={App} path="/">
		<Route name="home" path="home" component={LaunchPageHome} />
		<Route name="todo" path="todo" component={TodosHome} />
	</Route>
);
