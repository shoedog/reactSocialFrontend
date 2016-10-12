const registerValidate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password1) {
    errors.password = 'Required'
  }
  if (!values.password2) {
    errors.password = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  if (values.password1 !== values.password2 ) {
    errors.password2 = 'Passwords Must Match!'
  }
  return errors
}

export default validate
