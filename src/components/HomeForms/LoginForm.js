import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { loginUser } from '../../actions/user';
import { connect } from 'react-redux';

function validate(values) {
  const errors = {};

  // Check Required Fields have been submitted
  const requiredFields = ['username', 'password'];
  requiredFields.forEach(field => {
    if(!values[field]){
      errors[field] = 'Required'
    }
  });
  return errors;
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = {
      username: this.state.username,
      password: this.state.password,
    };
    let errors = validate(form);
    this.setState({
      errors: errors
    });
    if ( Object.keys(errors).length === 0 ) {
      this.props.dispatch(loginUser(form.username, form.password));
    }
  }

  render() {
    return (
      <div style={{"align":"center","textAlign":"center"}}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              id="username" type="text"
              hintText="Username"
              floatingLabelText="Username"
              value={this.state.username}
              onChange={this.handleChange}
              errorText={this.state.errors.username}
            />
            <br />
            <TextField
              id="password" type="password"
              hintText="Password"
              floatingLabelText="Password"
              value={this.state.password}
              onChange={this.handleChange}
              errorText={this.state.errors.password}
            /><br />
            <div>
              <RaisedButton label="Submit" primary={true} type="submit" disabled={this.props.submitting}/>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

export default connect()(LoginForm);

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //re.test(email) ? this.state.errorText = "Invalid Email" : this.state.errorText = '';
  console.log(re.test(email));
  //console.log(this.state.errorText);
};
