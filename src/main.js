console.log('Hello World!');
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './views/App'

injectTapEventPlugin();

render(<App />, document.getElementById('mount'));
