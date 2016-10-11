import React, { Component, PropTypes } from 'react';
import LaunchPageView         from '../LaunchPage_View';
import LaunchPageForm         from '../LaunchPage_Form/LaunchPageForm.jsx';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPageActions';
import { connect }            from 'react-redux';

class LaunchPageHome extends Component {

  render() {
    return (
      <div id="todo-list">
        <LaunchPageView/>
        <LaunchPageForm/>
      </div>
    );
  }
}

export default LaunchPageHome