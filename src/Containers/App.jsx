import React, { PropTypes } from 'react';
import Nav from './NavBar';
import { StyleSheet, css } from 'aphrodite/no-important';
/*if (process.env.BROWSER) {
  var s = require('./../../app.css');
}*/

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
  <div className={css(styles.root)}>
    <h1 className={css(styles.title)}>Moonwalk</h1>
    <Nav className={css(styles.nav)}/>
    {children}
    <footer className={css(styles.footer)}>
      <p className={css(styles.footerLink)} target='_blank'>Copyright © 2016 Team Moonwalk</p>
    </footer>
  </div>
);


const styles = StyleSheet.create({
  root: {
    maxWidth: "100%",
    backgroundColor: "#c0c0c0",
    color: '#000',
    margin: '0',
    padding: '0'
  },
  title: {
    color: '#000',
    backgroundColor: "#d8d8d8",
    textAlign: "center",
    maxWidth: "100%",
    fontWeight: 'bold',
    fontSize: 56
  },
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7'
  },
  footerLink: {
    display: 'inline-block',
    color: '#000',
    textDecoration: 'none'
  },
  nav: {
    width: '100%',
    align: 'center'
  }
});

export default App;
