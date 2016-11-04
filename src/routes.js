import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home/Home';
import About from './components/About/about';
import StreamList from './components/StreamList/stream';
import Page404 from './components/Page404/Page404';
import App from './Containers/App/App';


export default (
	<Route name="app" path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route name="login" path="login" component={Home}/>
		<Route name="about" path="about" component={About}/>
		<Route name="stream" path="stream" component={StreamList}/>
		<Route name="404" path="*" component={Page404} />
	</Route>
);
