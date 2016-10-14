import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
//import { StyleSheet, css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import '!style!css!./NavBar.css';


const Nav = () => (
  <div className="navbar">
    <IndexLink to='/' className="link" activeClassName="link activeLink">
      Home
    </IndexLink>

    <IndexLink to='/home' className="link" activeClassName="link activeLink">
      Login Page
    </IndexLink>


    <a href='https://github.com/jaredpalmer/react-production-starter' className="link" target='_blank'>GitHub Inspiration</a>
  </div>
);

/*const styles = StyleSheet.create({
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
});*/

export default Nav;
