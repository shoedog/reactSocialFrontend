import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home/Home'
import About from './components/about/about'
import Page404 from './components/Page404/Page404'
import App from './Containers/App';


export default (
	<Route name="app" path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route name="login" path="login" component={Home}/>
		<Route name="about" path="about" component={About}/>
		<Route name="404" path="*" component={Page404} />
	</Route>
);
