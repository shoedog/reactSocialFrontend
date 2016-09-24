import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Home from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.responsiveWindow = this.responsiveWindow.bind(this);
    this.state = {
      // Start off with this assumption.
      windowWidth: 1000
    }
  }

  /**
   * Adds listener for window resize event.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Removes listener for window resize event.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Receives an event when window is resized
   * Updates state based on new coordinates.
   */
  handleResize(e) {
    this.setState({windowWidth: global.innerWidth})
    console.log(this.state.windowWidth);
  }

  // use react router to change views
  handleLoginButton() {
    browserHistory.push('/login');
  }

  // use react router to change views
  handleSignupButton() {
    browserHistory.push('/signup');
  }

  handleLogoTouchTap() {
    browserHistory.push('/');
  }


  /**
   * Returns buttons or small menu based on size of window.
   */
  responsiveWindow() {
    if(this.state.windowWidth > 600) {
      return (
        <div style={{paddingTop: 5}}>
          <FlatButton onClick={this.handleLoginButton} label="sign in" />
          <FlatButton onClick={this.handleSignupButton} label="sign up" />
        </div>
      );
    } else {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      );
    }
  }

  render() {
    const navWindow = this.responsiveWindow()
    return (
      <AppBar
        title="CS419"
        iconElementLeft={<IconButton onClick={this.handleLogoTouchTap}><Home /></IconButton>}
        iconElementRight={
          <div>
            {navWindow}
          </div>
        }
      />
    );
  }
}

export default NavBar;
