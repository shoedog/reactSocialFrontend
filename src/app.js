console.log('Hello World!');
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './views/App'
import { browserHistory, Router } from 'react-router'
import { routes } from './routes';

injectTapEventPlugin();

render(<Router routes={routes} history={browserHistory} />, document.getElementById('mount'));
