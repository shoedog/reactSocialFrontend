import React, { Component, PropTypes } from 'react';
import { classNames } from 'classnames';
import HomeForms         from '../HomeForms/HomeForms';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPageActions';
import { connect }            from 'react-redux';
import RegisterForm           from '../HomeForms/RegisterForm';
//require("!style!css!./Home.css");
// import s from './Home.css';
import {Tabs, Tab, TextField, RaisedButton} from 'material-ui';

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {value: "1"};
  }

  handleToggle = (value) => {
    this.setState({value: value});
  }

  render() {
    return (
      <div>
      <Tabs value={this.state.value} onChange={this.handleToggle}>

        <Tab label="Sign In" value="1">
          <div id="login-form">
            <h1>Welcome Back!</h1>

            <TextField
              hintText="Email"
              errorText="A Valid Email Adress is Required"
              type="email"
              id="email"
            /><br />

            <TextField
              hintText="Password"
              errorText="Password is Required"
              type="password"
              id="password"
            /><br />

            <RaisedButton label="Log In" primary={true} />

          </div>
        </Tab>

        <Tab label="Register" value="2">
          <h1>Sign Up!</h1>
          <p>Add registration form here</p>
        </Tab>
          
      </Tabs>
      </div>
    );
  }
}

export default Home;