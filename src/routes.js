import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/Home/Home';
import About from './components/About/about';
import StreamList from './components/StreamList/stream';
import Page404 from './components/Page404/Page404';
import App from './Containers/App/App';
import NewUserSetup from './components/NewUserSetup/NewUserSetup';


export default (
	<Route name="app" path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route name="login" path="login" component={Home}/>
		<Route name="about" path="about" component={About}/>
		<Route name="stream" path="stream" component={StreamList}/>
		<Route name="NewUserSetup" path="NewUserSetup" component={NewUserSetup}/>
		<Route name="404" path="*" component={Page404} />
	</Route>
);
/*
export default (
	<Route name="app" path="/(:filter)" component={App}>
		<IndexRoute component={Home}/>
		<Route name="login" path="login" component={Home}/>
		<Route name="about" path="about" component={About}/>
		<Route name="stream" path="stream" component={StreamList}/>
		<Route name="NewUserSetup" path="NewUserSetup" component={NewUserSetup}/>
		<Route name="404" path="*" component={Page404} />
	</Route>
);*/

