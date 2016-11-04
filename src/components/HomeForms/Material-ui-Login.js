import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//(props) => {
//  const { handleSubmit, pristine, reset, submitting } = props;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
    /* if we want to use emails and do validation
    if(e.target.id === 'username') {
      validateEmail(e.target.value);
    }
    */
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(`Email: ${this.state.username} \nPassword: ${this.state.password}`);
  }




  /*  Validate Form input   */
  validate(values) {
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
            />
            <TextField
              id="password" type="password"
              hintText="Password"
              floatingLabelText="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div>
              <RaisedButton label="Submit" primary={true} type="submit" disabled={this.props.submitting}/>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

export default LoginForm;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //re.test(email) ? this.state.errorText = "Invalid Email" : this.state.errorText = '';
  console.log(re.test(email));
  //console.log(this.state.errorText);
};

  /*
export default reduxForm({
  form: 'loginForm', // a unique name for this form
  validate,
})(LoginForm);


  <Field name="username" component= { (username) =>
    <TextField
      type="text"
      hintText = "Username"
      floatingLabelText="Username"
      errorText = {username.touched && username.error}
      {...username}
    />
  }/>
  </div>
  <div>
  <Field name="password" component={ (password) =>
  <TextField
    type="password"
    hintText="Password"
    floatingLabelText="Password"
    errorText = {password.touched && password.error}
    {...password}
  />
}/>
  </div>*/
