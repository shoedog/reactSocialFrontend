import React, { Component, PropTypes } from 'react';
import { classNames } from 'classnames';
import MaterialuiLogin        from '../HomeForms/Material-ui-Login';
import MaterialuiRegister     from '../HomeForms/Material-ui-Register';
import { bindActionCreators } from 'redux';
import * as LaunchPageActions from '../../actions/LaunchPageActions';
import { connect }            from 'react-redux';
import Paper from 'material-ui/Paper';
//require("!style!css!./Home.css");
import s from './Home.css';
import {Tabs, Tab, TextField, RaisedButton} from 'material-ui';
import * as actionCreators from '../../actions/userActions';

const showResults = (values) => {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {  // simulate server latency
      resolve(values);
    }, 500)
  })
};

const simAsync = (values) => {
  showResults(values).then( (result) => {
    console.log(result);
    window.alert(`You submitted:\n\n${JSON.stringify(result, null, 2)}`);
  })
};

function mapStateToProps(state) {
  return {
    userData: state.userData,
    userDataIds: state.userDataIds
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
      <div>
      <Paper className={s.paperBlock}>
        <Tabs >

          <Tab label="Sign In" value="a">
            <MaterialuiLogin loginUser={loginUser}/>
          </Tab>

          <Tab label="Register" value="b">
            <MaterialuiRegister registerUser={registerUserServer}/>
          </Tab>

        </Tabs>
      </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Home);
