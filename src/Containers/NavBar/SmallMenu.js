'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { getSessionItem } from '../../utils/lib/sessionUtils';
import { loginUser } from '../../actions/user';
import { connect } from 'react-redux';

class SmallMenu extends Component {
  render() {
    const { user, onLogoutClick } = this.props;
    if( user != null)
      return (

          <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem children={<Subheader children={user}/>}/>
            <Divider />
            <MenuItem primaryText="Profile" containerElement={<Link to="/profile"/>}/>
            <MenuItem primaryText="Stream" containerElement={<Link to="/stream"/>}/>
            <MenuItem primaryText="Trending"
                      containerElement={<Link to="/trends"/>}/>
            <MenuItem primaryText="Sentiment Analysis" containerElement={<Link to="/sentiment"/>}/>
            <MenuItem primaryText="Sign out" onClick={onLogoutClick}
                      containerElement={<Link to="/login"/>}/>
          </IconMenu>
    );
    else
      return (
          <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Sign In or Sign Up"
                      containerElement={<Link to="/login"/>}/>
            <MenuItem primaryText="Trending"
                      containerElement={<Link to="/trends"/>}/>
            <MenuItem primaryText="Sentiment Analysis"
                      containerElement={<Link to="/sentiment"/>}/>
            <MenuItem primaryText="About"
                      containerElement={<Link to="/about"/>}/>
            <MenuItem primaryText="Contact"
                      containerElement={<Link to="/contact"/>}/>

          </IconMenu>
      );
  }
};

export default SmallMenu;

