import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite/no-important';

import { connect } from 'react-redux';


const Nav = () => (
  <div className={css(styles.navbar)}>
    <IndexLink to='/' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>
      Home
    </IndexLink>

    <IndexLink to='/home' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>
      Login Page
    </IndexLink>

    
    <a href='https://github.com/jaredpalmer/react-production-starter' className={css(styles.link)} target='_blank'>GitHub Inspiration</a>
  </div>
);


const styles = StyleSheet.create({
  link: {
    maxWidth: '25%',
    color: '#FFFFFF',
    margin: "0 10px 0 10px",
    padding: "20px",
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: "solid black round",
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.4
    }
  },
  activeLink: {
    backgroundColor: '#FFFFFF',
    color: '#585555'
  },
  navbar: {
    backgroundColor: '#585555',
    paddingLeft: "20px"
  }
});

export default Nav;
