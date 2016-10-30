import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*  Validate Form input   */
const validate = values => {
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
}

/*  Material UI Form  */
const RegisterForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  
  return (
    <div style={{"align":"center","textAlign":"center"}}>
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="username" component= { (username) => 
          <TextField hintText = "Username" 
            floatingLabelText="Username"
            errorText = {username.touched && username.error}
            {...username} 
          />
        }/>
      </div>
      <div>
        <Field name="email" component={ (email) =>
              <TextField 
                hintText="Email"
                floatingLabelText="Email"
                errorText = {email.touched && email.error}
                {...email}
              />
            }/>
      </div>
      <div>
        <Field name="password1" component={ (password1) =>
              <TextField 
                hintText="Password"
                floatingLabelText="Password"
                errorText = {password1.touched && password1.error}
                {...password1}
              />
            }/>
      </div>
      <div>
        <Field name="password2" component={ (password2) =>
              <TextField 
                hintText="Confirm Password"
                floatingLabelText="Confirm Password"
                errorText = {password2.touched && password2.error}
                {...password2}
              />
            }/>
      </div>
      <div>
          <RaisedButton label="Submit" primary={true} type="submit" disabled={submitting}/>
      </div>
    </form>
    </div>
  );
}

export default reduxForm({
  form: 'registerForm', // a unique name for this form
  validate,
})(RegisterForm);
