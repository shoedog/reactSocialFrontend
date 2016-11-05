import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*  Validate Form input   */
const validate = (values) => {
  const errors = {};

  // Check Required Fields have been submitted
  const requiredFields = ['username', 'email', 'password1', 'password2'];
  requiredFields.forEach(field => {
    if(!values[field]){
      errors[field] = 'Required'
    }
  })
  // Validate Email
  if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = 'Invalid email address';
  }
  // Validate Passwords Match
  if (values.password1 !== values.password2) {
    errors.password2 = 'Passwords Must Match!';
  }
  return errors;
};

/*  Material UI Form  */
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
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
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
    };
    let errors = validate(form);
    this.setState({
      errors: errors
    });
    console.log(errors);
    if ( Object.keys(errors).length === 0 ) {
      alert(`Username: ${this.state.username} \nEmail: ${this.state.email} \nPassword: ${this.state.password1}`);
      this.props.registerUser(form.username, form.email, form.password1);
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
            <TextField
              id="email" type="email"
              hintText="Email"
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleChange}
              errorText={this.state.errors.email}
            />
            <TextField
              id="password1" type="password"
              hintText="Password"
              floatingLabelText="Password"
              value={this.state.password1}
              onChange={this.handleChange}
              errorText={this.state.errors.password1}
            />
            <TextField
              id="password2" type="password"
              hintText="Password"
              floatingLabelText="Password"
              value={this.state.password2}
              onChange={this.handleChange}
              errorText={this.state.errors.password2}
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

export default RegisterForm;
