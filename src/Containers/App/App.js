import React, { PropTypes } from 'react';
import NavBar from '../NavBar/NavBar';
import s from './App.css';
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


    <div>
      <NavBar />
      {children}
      <footer className={s.footer}>
        <p className={s.footerLink} target='_blank'>Copyright © 2016 Team Moonwalk</p>
      </footer>

    </div>



);

export default App;
