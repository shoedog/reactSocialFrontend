import request from 'axios';

export function userLogin(email, password) {
  return {
    type: 'USER_LOGIN',
    email,
    password,
    date: Date.now()
  }
}

