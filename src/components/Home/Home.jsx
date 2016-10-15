import React, { Component, PropTypes } from 'react';
import { classNames } from 'classnames';
import HomeForms         from '../HomeForms/HomeForms';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPageActions';
import { connect }            from 'react-redux';
import RegisterForm           from '../HomeForms/RegisterForm';
require("!style!css!./Home.css");

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {toggle: true};
  }

  handleToggle() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    return (
      <div className="Home">
        <div className="loginOptions">
          <button className="signInBox" onClick={!this.state.toggle ? () => this.handleToggle() : () => {}} selected={this.state.toggle}>Log In</button>
          <button className="signUpBox" onClick={ this.state.toggle ? () => this.handleToggle() : () => {}} selected={this.state.toggle}>Register</button>
        </div>
        {this.state.toggle ? <HomeForms onSubmit={showResults}/> : <RegisterForm className="registerForm" onSubmit={showResults}/>}
      </div>
    );
  }
}

export default Home
