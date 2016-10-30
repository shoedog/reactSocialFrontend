import React, { Component, PropTypes } from 'react';
import { classNames } from 'classnames';
import LoginForm              from '../HomeForms/LoginForm';
import RegisterForm           from '../HomeForms/RegisterForm';
import MaterialuiLogin        from '../HomeForms/Material-ui-Login';
import MaterialuiRegister     from '../HomeForms/Material-ui-Register';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPageActions';
import { connect }            from 'react-redux';
import Paper from 'material-ui/Paper';
//require("!style!css!./Home.css");
import s from './Home.css';
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
      <Paper style={{"align":"center", "textAlign":"center", "padding":"20px", "margin":"100px"}}>
        <Tabs value={this.state.value} onChange={this.handleToggle}>

          <Tab label="Sign In" value="1">
            <MaterialuiLogin onSubmit={showResults}/>
          </Tab>

          <Tab label="Register" value="2">
            <MaterialuiRegister onSubmit={showResults}/>
          </Tab>
            
        </Tabs>
      </Paper>
      </div>
    );
  }
}

export default Home;