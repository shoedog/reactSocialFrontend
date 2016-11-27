import { browserHistory } from 'react-router';
import userApi from '../utils/fetchHandlers/user';
import { startAction, successAction,
  failureAction, asyncAction } from '../utils/lib/asyncActionUtils';
//import { eraseStorage, getSessionItem } from '../utils/lib/sessionUtils';

export const UPDATE_USER = 'UPDATE_PROFILE';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT = 'LOGOUT';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_PENDING = 'LOGIN_PENDING';
export const AUTH_FAILURE = 'LOGIN_FAILURE';
export const ROUTE_TO = 'ROUTE_TO';
export const LOGIN = 'LOGIN';
export const CHECK_SESSION = 'CHECK_SESSION';

export const logout = () => ({
  type: LOGOUT
});

// Synchronous local action: updates an item locally
export const registerUserServer = (username, email, password) => {
  return dispatch => {
    return dispatch({
      type: 'REGISTER_USER',
      payload: userApi.USER.register(username, email, password),
    }).then( ({ value, action}) => {
      console.log(value);
      console.log(action.type);
      if( action.type === 'REGISTER_USER_FULFILLED'){
        dispatch(authSuccess(value));
        browserHistory.push( '/newUserSetup');
      } else if ( action.type === 'LOGIN_REJECTED'){
        dispatch(authFailure(value));
      }
    });
  }
};

export const checkSession = (token, user, userId) => ({
  type: CHECK_SESSION,
  payload: {
    user: user,
    token: token,
    userId: userId
  }
});

export const loginUser = (username, password) => {
  return dispatch => {
    return dispatch({
      type: 'LOGIN',
      payload: userApi.USER.login(username, password)
    }).then( ({ value, action}) => {
        console.log(value);
        console.log(action.type);
      if( action.type === 'LOGIN_FULFILLED'){
        dispatch(authSuccess(value));
        browserHistory.push('/stream');
      } else if ( action.type === 'LOGIN_REJECTED'){
        dispatch(authFailure(value));
      }
    });
  }
};

export const deleteAccount = (userId, userToken) => {
  return dispatch => {
    return dispatch({
      type: 'DELETE',
      payload: userApi.USER.delete(userId, userToken)
    })
    .then( ({value, action}) => {
      console.log(value);
      console.log(action);
      if(action.type === 'DELETE_FULFILLED'){
        browserHistory.push('/');
        alert("Accounted Deleted!");
      }
    })
    .catch( error => {
      console.log(`Error: ${error}`);
      alert(`Error: ${error}`);
    })
  }
}

export const authSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
  meta: {
    done: true,
  },
});


export const authFailure = (payload) => ({
  type: AUTH_FAILURE,
  error: true,
  payload,
  meta: {
    done: true,
  }

});


/**
 * Fetch Feed Items from server: GET
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const fetchUserProfileType = 'fetchUserProfile';
export const fetchUserProfileStart = startAction(fetchUserProfileType);
export const fetchUserProfileSuccess = successAction(fetchUserProfileType);
export const fetchUserProfileFailure = failureAction(fetchUserProfileType);
export const fetchUserProfile = asyncAction({
  func: (id) => userApi.USER.fetch(id),
  start: fetchUserProfileStart,
  success: fetchUserProfileSuccess,
  failure: fetchUserProfileFailure,
});


/**
 * Register User: POST
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
/*
const registerUserServerType = 'registerUserServer';
export const registerUserServerStart = startAction(registerUserServerType);
export const registerUserServerSuccess = successAction(registerUserServerType)
export const registerUserServerFailure = failureAction(registerUserServerType);
export const registerUserServer = asyncAction({
  func: (username, email, password) => userApi.USER.register(username, email, password),
  start: registerUserServerStart,
  success: registerUserServerSuccess,
  failure: registerUserServerFailure,
});
 */

/**
 * Login : POST
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
/*
const loginUserType = 'loginUser';
export const loginUserStart = startAction(loginUserType);
export const loginUserSuccess = successAction(loginUserType);
export const loginUserFailure = failureAction(loginUserType);
export const loginUser = asyncAction({
  func: (username, password) => userApi.USER.login(username, password),
  start: loginUserStart,
  success: loginUserSuccess,
  failure: loginUserFailure,
});*/


/**
 * Update User Profile on server: PUT
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const updateUserServerType = 'updateUserServer';
export const updateUserServerStart = startAction(updateUserServerType);
export const updateUserServerSuccess = successAction(updateUserServerType);
export const updateUserServerFailure = failureAction(updateUserServerType);
export const updateUserServer = asyncAction({
  func: (id, userData) => userApi.USER.updateUser(id, userData),
  start: updateUserServerStart,
  success: updateUserServerSuccess,
  failure: updateUserServerFailure,
});

/**
 * Login : POST
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const deleteUserType = 'deleteUser';
export const deleteUserStart = startAction(deleteUserType);
export const deleteUserSuccess = successAction(deleteUserType);
export const deleteUserFailure = failureAction(deleteUserType);
export const deleteUser = asyncAction({
  func: (id) => userApi.USER.delete(),
  start: deleteUserStart,
  success: deleteUserSuccess,
  failure: deleteUserFailure,
});
