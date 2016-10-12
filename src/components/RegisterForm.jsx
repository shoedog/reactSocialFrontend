import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

const submit = (values, dispatch) => {
//  return new Promise((resolve, reject) => {
    if( values.email && values.password && values.username ) {
/*      axios.get(`http://${config.apiHost}:${config.apiPort}/auth/${values.email}/${values.password}`)
     .then (response => {
       if(response.status === 200) {
         dispatch(auth(values.email, values.password))
         resolve()
       }
     })
     .catch(response => {
       if(response.status !== 200) {
         reject({ username: 'Invalid username or password', _error: 'Login failed!' })
       }
     })*/
   } console.log(values);
//  })
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
      <form onSubmit={handleSubmit(submit)}>
        <Field name="email" component="input" type="email" component={renderField} label="Email" />
        <Field name="username" component="input" type="text" component={renderField} label="User Name" />
        <Field name="password1" component="input" type="password" component={renderField} label="Password"/>
        <Field name="password2" component="input" type="password" component={renderField} label="Password"/>
        <div>
          <button type="submit" disabled={ submitting }>Submit</button>
        </div>
      </form>
    );
}

export default reduxForm({
  form: 'registerForm', // a unique name for this form
  registerValidate,
})(RegisterForm);
