import userApi from '../utils/userApi';
import { startAction, successAction,
  failureAction, asyncAction } from './asyncActionUtils';

export const OPEN_PROFILE = 'OPEN_PROFILE';
export const CLOSE_PROFILE = 'CLOSE_PROFILE';
export const UPDATE_USER = 'UPDATE_PROFILE';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const DISCARD_TOKEN = 'DISCARD_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Synchronous local action: opens a specific item
export const openProfile = (id: '') => ({
  type: OPEN_PROFILE,
  payload: { id },
});

// Synchronous local action: closes a specific item
export const closeProfile = () => ({
  type: CLOSE_PROFILE,
});

// Synchronous local action: updates an item locally
export const updateUser = (profile, id) => ({
  type: UPDATE_USER,
  payload: {
    id,
    profile,
  },
});

// Synchronous local action: updates an item locally
export const registerUser = (email, password) => ({
  type: REGISTER_USER,
  payload: {
    email,
    password,
  },
});

export const logout = (router) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    router.transitionTo(['/login', { redirectTo: stringifyLocation(router.state.location)}]);
  }
};

export const loginSuccess = (router) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS });
    router.transitionTo(['/stream', { redirectTo: stringifyLocation(router.state.location)}]);
  }
};

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token
  }
};

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
const registerUserServerType = 'registerUserServer';
export const registerUserServerStart = startAction(registerUserServerType);
export const registerUserServerSuccess = successAction(registerUserServerType);
export const registerUserServerFailure = failureAction(registerUserServerType);
export const registerUserServer = asyncAction({
  func: (username, email, password) => userApi.USER.register(username, email, password),
  start: registerUserServerStart,
  success: registerUserServerSuccess,
  failure: registerUserServerFailure,
});

/**
 * Login : POST
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const loginUserType = 'loginUser';
export const loginUserStart = startAction(loginUserType);
export const loginUserSuccess = successAction(loginUserType);
export const loginUserFailure = failureAction(loginUserType);
export const loginUser = asyncAction({
  func: (username, password) => userApi.USER.login(username, password),
  start: loginUserStart,
  success: loginUserSuccess,
  failure: loginUserFailure,
});

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