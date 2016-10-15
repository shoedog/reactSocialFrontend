import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
export const fields = [ 'email', 'password' ];

const submit = (values, dispatch) => {
//  return new Promise((resolve, reject) => {
    if( values.email && values.password ) {
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

   }
   console.log(values);
// })
}

//Form Sync validation. We can add submit validation too( see redux-form docs)
const loginValidate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

//Makes a Label & Input Field
const renderField = ({ input, value, label, type, onChange, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} value={value} placeholder={label}  />
      {touched && error && <div>{error}</div>}
    </div>
  </div>
)

const LoginForm = (props) => {
  const { fields: { email, password}, error, handleSubmit, pristine, reset, submitting } = props;

    return (
      <div id="login-form">
        <h1 style={{"textAlign":"center"}}>Welcome Back!</h1>
        <div style={{"align":"center", "backgroundColor":"#CBC5C4", "textAlign":"center", "marginLeft":"200px", "marginRight":"200px", "border":"solid black"}}>
          <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            <Field name="email" component="input" type="email" component={renderField} label="Email" value={email} onChange={ e => e.target.value }/>
            <Field name="password" component="input" type="password" component={renderField} label="Password" value={password} onChange={ e => e.target.value }/>
            <div>
              <button type="submit" disabled={ submitting }>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default reduxForm({
  form: 'loginForm', // a unique name for this form
  loginValidate,
  fields,
})(LoginForm);
