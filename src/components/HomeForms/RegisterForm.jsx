import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import qs from 'qs';


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


const registerValidate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password1) {
    errors.password = 'Required'
  }
  if (!values.password2) {
    errors.password = 'Required'
  }
  if (values.password1 !== valuespassword2) {
    errors.password2 = 'Passwords Must Match!'
  }
  return errors
}

//Makes a Label & Input Field
const renderField = ({ input, value, label, type, name, onChange, meta: { dirty, error } }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} value={value} onChange={ e => e.target.value }/>
      {dirty && error && <span>{error}</span>}
    </div>
  </div>
)

const RegisterForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return(
    <div className="registration">
      <h1 style={{"textAlign":"center"}}>Register New User</h1>
      <div style={{"align":"center", "backgroundColor":"#d8d8d8", "textAlign":"center", "marginLeft":"200px", "marginRight":"200px", "border":"solid black"}}>
      <form onSubmit={handleSubmit(submit)}>
        <Field name="email" component="input" type="email" component={renderField} label="Email" />
        <Field name="username" component="input" type="text" component={renderField} label="User Name" />
        <Field name="password1" component="input" type="password" component={renderField} label="Password"/>
        <Field name="password2" component="input" type="password" component={renderField} label="Password"/>
        <div>
          <button type="submit" disabled={ submitting }>Submit</button>
        </div>
      </form>
        </div>
    </div>
    );
}

export default reduxForm({
  form: 'registerForm', // a unique name for this form
  registerValidate,
})(RegisterForm);
