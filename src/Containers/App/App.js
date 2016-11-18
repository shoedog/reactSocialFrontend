import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import s from './App.css';
import { logout } from '../../actions/user';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/*
 * React-router route replaces `children` with the proper React Component.
 *  Refer to `routes.js` for the route config.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            windowWidth: 1000
        };
    }
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

    handleLogoutClick = () => {
        this.props.logout();
    };

    render() {
        const { children, user, onLogoutClick } = this.props;

        return (
            <div>
                <NavBar username={user.displayName} windowWidth={this.state.windowWidth} onLogoutClick={this.handleLogoutClick}/>
                {children}
                <footer className={s.footer}>
                    <p className={s.footerLink} target='_blank'>Copyright © 2016 Team Moonwalk</p>
                </footer>
            </div>
        )
    }
}

const propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state) {
    console.log(state);
    return {
        user: state.user,
    }
};

// connect from react-redux attaches state & actions to props
export default connect(mapStateToProps, {logout})(App);
