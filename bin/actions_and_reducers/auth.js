import axios from 'axios';
import querystring from 'querystring';
import stringifyLocation from '../../src/utils/lib/stringifyLocation';

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SAVE_AUTH_TOKEN = 'SAVE_AUTH_TOKEN'
export const LOGOUT = 'LOGOUT'
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR'

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
  //user
})

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
})

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  errorMsg: error,
})

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
  //user
})

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token: token,
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  errorMsg: error,
})

export const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  profile: profile
})

export const fetchProfileError = (error) => ({
  type: FETCH_PROFILE_ERROR,
  error: error
})

export const logout = (router, token) => {
  return (dispatch) => {
    token = null;
    dispatch({ type: LOGOUT });
    router.transitionTo(['/login', { redirectTo: stringifyLocation(router.state.location)}]);
  }
}



export function requestUserRegister(user) {
  return function (dispatch) {
    dispatch(registerRequest(user))

    return axios.post('/register',
      querystring.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
        registerDate: Date.now()
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then( (response) => {
        console.log(response.data);
        let token = response.data.token;
        let profile = response.data.profile;
        saveAuthToken(token);
        dispatch(loginConfirm(token));
        dispatch(fetchProfileSuccess(profile));
        dispatch(registerSuccess());
    }).catch( (err) => {
        console.log("error submitting")
        console.log(err);
        dispatch(registerFailure(err));
    })
  }
}

export function login(email, password, router) {
  return function (dispatch) {
    dispatch(loginRequest())

    return axios.post('/login', {
      auth: {
        email: email,
        password: password
      }
    })
  }
}
/*
.then( (response) => {
    console.log(response);
    let token = response.data;
    let profile = response.data.profile;
    saveAuthToken(token);
    dispatch(loginSuccess(token));
    dispatch(fetchProfileSuccess(profile));
    const { query } = router.state.location;
    const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/';
    router.transitionTo(redirectTo);
}).catch( (err) => {
    console.log("error login")
    console.log(err);
    let error = (err.status === 401)
        ? Error('Incorrect email or password')
        : Error('Unknown error occured. Please, try again later.');
    dispatch(loginFailure(error));
})*/

export function fetchProfile() {
  return function (dispatch) {
    dispatch(profileRequest)
    const { auth: { token } } = getState();
    if (!token) { return; }

    return axios.get('/profile', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then( (response) => {
        let userProfile = response.userProfile;
        dispatch(fetchProfileSuccess(userProfile));
    }).catch( (err) => {
        dispatch(fetchProfileError(err));
    })
  }
}
