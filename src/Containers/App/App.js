import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import s from './App.css';
import { logout, checkSession } from '../../actions/user';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getSessionItem } from '../../utils/lib/sessionUtils';
import Favicon from 'react-favicon';
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
        let { checkSession } = this.props;
        window.addEventListener('resize', this.handleResize);
        const token = getSessionItem('token');
        const user = getSessionItem('username');
        const userId = getSessionItem('userId');
        if (token) {
          checkSession(token, user, userId);
        }

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
                <Favicon url={'./favicon.ico'} />
                <NavBar username={user.displayName} windowWidth={this.state.windowWidth} onLogoutClick={this.handleLogoutClick}/>
                {children}
                <footer className={s.footer}>
                    <p className={s.footerLink} target='_blank'></p>
                </footer>
            </div>
        )
    }
}

const propTypes = {
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {
        user: state.user,
    }
};

/*
const mapDispatchToProps = (dispatch) => {
  return {
      checkSession: bindActionCreators({checkSession}, dispatch),
      logout: bindActionCreators({logout}, dispatch)
  }
};*/

// connect from react-redux attaches state & actions to props
export default connect(mapStateToProps, {checkSession, logout})(App);
