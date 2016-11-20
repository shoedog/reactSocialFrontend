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
    console.log(user);
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
            <MenuItem primaryText="About"
                      containerElement={<Link to="/about"/>}/>
            <MenuItem primaryText="Contact"
                      containerElement={<Link to="/contact"/>}/>

          </IconMenu>
      );
  }
};

export default SmallMenu;


/*
class SmallMenu extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.auth = this.props.AuthStore;
    this.profile = this.props.ProfileStore;
    this.handleSignout = this.handleSignout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleSignout() {
    window.removeEventListener('resize', this.handleResize);
  }


   // Displays different menu according to whether user is logged in.


  // TODO: change to listen to redux
  getUser() {
    if (getSessionItem('username') == true && getSessionItem('token') == true) {
      let username = getSessionItem('username');
      return (
        <div>
        <Subheader> username </Subheader>
        <Divider />
        <MenuItem primaryText="Profile" />
        <MenuItem primaryText="Sign out" onClick={this.handleSignout}/>
        </div>
      );
    } else {
      return (
        <div>
        <MenuItem primaryText="Sign In" />
        <MenuItem primaryText="Sign Up" />
        </div>
      );
    }
  }

  render(){
    const getUser = this.getUser();
    return(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        {getUser}
      </IconMenu>
    );
  }
}

export default connect()(SmallMenu);
*/
