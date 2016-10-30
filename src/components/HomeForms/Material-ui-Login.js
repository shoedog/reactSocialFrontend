import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*  Validate Form input   */
const validate = values => {
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

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

    return (
    <div style={{"align":"center","textAlign":"center"}}>
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>
        <div>
          <RaisedButton label="Submit" primary={true} type="submit" disabled={submitting}/>
        </div>
      </form>
    </div>
    );
}

export default reduxForm({
  form: 'loginForm', // a unique name for this form
  validate,
})(LoginForm);
