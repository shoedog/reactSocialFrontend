import React, { PropTypes } from 'react';

export default class LaunchPageForm extends React.Component {

  handleSubmit(){

  }

  render() {
    return (
      <div id="login-form">
        <h1 style={{"textAlign":"center"}}>Login stuffs here!</h1>
        <div style={{"align":"center", "backgroundColor":"#CBC5C4", "textAlign":"center", "marginLeft":"200px", "marginRight":"200px", "border":"solid black"}}>
          <p>Email: </p>
          <p>Password: </p>
        </div>
      </div>
    );
  }
}
