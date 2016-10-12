import React, { Component, PropTypes } from 'react';
import { classNames } from 'classnames';
import LaunchPageView         from '../LaunchPage_View';
import LaunchPageForm         from '../LaunchPage_Form/LaunchPageForm';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPageActions';
import { connect }            from 'react-redux';
import RegisterForm           from '../RegisterForm';

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

class LaunchPageHome extends Component {
  constructor(props) {
    super(props)
    this.state = {toggle: true};
  }

  handleToggle() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    return (
      <div id="todo-list">
        <LaunchPageView/>
        <div>
          <span onClick={!this.state.toggle ? () => this.handleToggle() : () => {}} selected={this.state.toggle}>SIGN IN</span>
          <span onClick={ this.state.toggle ? () => this.handleToggle() : () => {}} selected={this.state.toggle}> SIGN UP</span>
        </div>
        {this.state.toggle ? <LaunchPageForm onSubmit={showResults}/> : <RegisterForm onSubmit={showResults}/>}
      </div>
    );
  }
}

export default LaunchPageHome
