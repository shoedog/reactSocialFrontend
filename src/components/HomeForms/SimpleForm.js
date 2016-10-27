import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import qs from 'qs';
import TextField from 'material-ui';

/*  Validate Form input   */
const registerValidate = values => {
  const errors = {}

  // Check Required Fields have been submitted
  const requiredFields = ['username', 'email', 'password1', 'password2']
  requiredFields.forEach(field => {
    if(!values[field]){
      errors[field] = 'Required'
    }
  })
  // Validate Email
  if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = 'Invalid email address'
  }
  // Validate Passwords Match
  if (values.password1 !== values.password2) {
    errors.password2 = 'Passwords Must Match!'
  }
  return errors
}

/*  Material UI Form  */
const RegisterForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
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
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    if( values.email && values.password1 && values.username ) {
      axios.post(`http://0.0.0.0:5000/user`, qs.stringify({
        username: values.username,
        password: values.password1
      }), headers)
     .then (response => {
       console.log(response)
     })
     .catch(response => {
       if(response.status !== 200) {
         console.log(response);
         reject({ username: 'Invalid username or password', _error: 'Login failed!' })
       }
     })
   } console.log(values);
  })
}

export default reduxForm({
  form: 'registerForm', // a unique name for this form
  registerValidate,
})(RegisterForm);
