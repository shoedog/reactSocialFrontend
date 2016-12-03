import React, { PropTypes } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import {AppBar, FlatButton, IconButton, Badge} from 'material-ui';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import SmallMenu from './SmallMenu';

const NavBar = (props) => {
    const { username, windowWidth, onLogoutClick } = props;

    return (
        <AppBar
                title={ ( username == null ) ?
                    <Link to="/login"><FlatButton label="Moonwalk"/></Link>
                    : <Link to="/profile"><FlatButton label="Moonwalk"/> </Link>}
            showMenuIconButton={false}
            iconElementRight= {
                ( windowWidth > 600 && username == null ) ?
                    <div>
                        <Link to="/login"><FlatButton label="Login/Register" /></Link>
                        <Link to="/about"><FlatButton label="About" /></Link>
                        <Link to="/sentiment"><FlatButton label="Sentiment Analysis" /></Link>
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

