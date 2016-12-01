import React, { Component, PropTypes } from 'react';
import { classNames } from 'classnames';
import LoginForm        from '../HomeForms/LoginForm';
import RegisterForm     from '../HomeForms/RegisterForm';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPage';
import { connect }            from 'react-redux';
import Paper from 'material-ui/Paper';
import s from './Home.css';
import {Tabs, Tab, TextField, RaisedButton} from 'material-ui';
import * as actionCreators from '../../actions/user';

function mapStateToProps(state) {
  return {
    username: state.user,
    token: state.token
  }
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleToggle = (e) => {
    this.setState({value: this.state.value});
  };

  render() {
    const { loginUser, registerUserServer } = this.props;

    return (
      <Paper className={s.paperBlock} zDepth={0}>
        <Tabs >

          <Tab label="Sign In" value="a">
            <LoginForm loginUser={loginUser}/>
          </Tab>

          <Tab label="Register" value="b">
            <RegisterForm registerUser={registerUserServer}/>
          </Tab>

        </Tabs>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Home);
