import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite/no-important';

import { connect } from 'react-redux';


const Nav = () => (
  <div>
    <IndexLink to='/' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>
      Home
    </IndexLink>
    <Link to='/posts' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}> Example Feed:<br/> Not Implemented
    </Link>
    <a href='https://github.com/jaredpalmer/react-production-starter' className={css(styles.link)} target='_blank'>GitHub Inspiration</a>
  </div>
);


const styles = StyleSheet.create({
  link: {
    maxWidth: '25%',
    color: '#	0000FF',
    margin: '1.5rem 1rem 1.5rem 0',
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.4
    }
  },
  activeLink: {
    color: '#000080'
  }
});

export default Nav;

