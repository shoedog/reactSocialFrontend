import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LaunchPageHome from './components/LaunchPage_Home/LaunchPageHome'
import App from './containers/App';


export default (
	<Route name="app" component={App} path="/">
		<Route name="home" path="home" component={LaunchPageHome} />
	</Route>
);
