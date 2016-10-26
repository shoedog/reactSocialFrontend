import React, { PropTypes } from 'react';
import NavBar from './NavBar';
//require('!style!css!./App.css');
import s from './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({children}) => (
  <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
    <div>

      <NavBar />
      
      {children}

      <footer className={s.footer}>
        <p className={s.footerLink} target='_blank'>Copyright © 2016 Team Moonwalk</p>
      </footer>

    </div>

  </MuiThemeProvider>
);

export default App;
