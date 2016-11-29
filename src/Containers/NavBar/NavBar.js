import React, { PropTypes } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import {AppBar, FlatButton, IconButton, Badge} from 'material-ui';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import SmallMenu from './SmallMenu';

const NavBar = (props) => {
    const { username, windowWidth, onLogoutClick } = props;
    //console.log(username);
    //console.log(windowWidth);

    return (
        <AppBar
            title = {<Link to="/login"> <FlatButton label="Moonwalk"/> </Link>}
            showMenuIconButton={false}
            iconElementRight= {
                ( windowWidth > 600 && username == null ) ?
                    <div>
                        <Link to="/login"><FlatButton label="Login/Register" /></Link>
                        <Link to="/about"><FlatButton label="About" /></Link>
                        <Link to="/profile"><FlatButton label="Profile" /></Link>
                        <Link to="/stream"><FlatButton label="Stream" /></Link>
                    </div> :
                    <div>
                        <Badge badgeContent={0} primary={true}>
                          <NotificationsIcon />
                        </Badge>
                        <SmallMenu user={username} onLogoutClick={onLogoutClick}/>
                    </div>
            }
        />
    );
};

export default NavBar;

/* refactored to handle window size in App component & pass username prop down from
// redux store
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
     windowWidth: 1000
    };
  }

  // add listeners
  componentDidMount () {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  // keep track of window size so we can restyle AppBar
  handleResize (e) {
    this.setState({windowWidth: global.innerWidth});
  }

  // logo takes user to home page
  handleLogoTouchTap () {
      browserHistory.push('/login');
  }

  // whether to show buttons or small menu
  // TODO: change this to reference redux
    //  && !sessionStorage.getItem('username')
    // <SmallMenu />
  getWindow () {
    if(this.state.windowWidth > 600 && getSessionItem('username') == false) {
      return (
        <div>
            <Link to="/about">
                <FlatButton label="About" />
            </Link>
            <Link to="/contact">
                <FlatButton label="Contact" />
            </Link>
            <Link to="/stream">
                <FlatButton label="Stream" />
            </Link>
          <IconButton iconClassName="muidocs-icon-custom-github" href="https://github.com/andrew310/cs419-frontend" tooltip="Frontend" />
       </div>
    );} else {
      return(
          <SmallMenu/>
      );
    }
  }

  render () {
    //const getWindow = this.getWindow();
    //const { user.token, user.user } = this.props;

    return (
      <AppBar
        title = {<Link to="/login"> <FlatButton label="Moonwalk"/> </Link>}
        iconElementRight= {
          <div>
          {getWindow}
          </div>
        }
      />
    );
  } // end of render
} // end of class
*/
