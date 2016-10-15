import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LaunchPageHome from './components/LaunchPage_Home/LaunchPageHome'
import Page404 from './components/Page404/Page404'
import App from './Containers/App';


export default (
	<Route name="app" path="/" component={App}>
		<Route name="home" path="home" component={LaunchPageHome} />
		<Route name="404" path="*" component={Page404} />
	</Route>
);
