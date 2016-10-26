import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import {AppBar, FlatButton, IconButton} from 'material-ui';

const NavBar = () => (

  <AppBar
    title = {<FlatButton label="Moonwalk" href="/" />}
    iconElementRight= {
      <div>
        <FlatButton label="About" href="/about" />
        <FlatButton label="Contact" href="/contact"  />
        <FlatButton label="Stream" href="/stream"  />
        <IconButton iconClassName="muidocs-icon-custom-github" href="https://github.com/andrew310/cs419-frontend" tooltip="Frontend" />
     </div>
    }
  />
);

export default NavBar;