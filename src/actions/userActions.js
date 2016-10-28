import userApi from '../utils/userApi';
import { startAction, successAction,
  failureAction, asyncAction } from './asyncActionUtils';

export const OPEN_PROFILE = 'OPEN_PROFILE';
export const CLOSE_PROFILE = 'CLOSE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const LOGOUT = 'LOGOUT';

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
export const updateProfile = (profile, id) => ({
  type: UPDATE_PROFILE,
  payload: {
    id,
    profile,
  },
});

export const logout = (router, token) => {
  return (dispatch) => {
    token = null;
    dispatch({ type: LOGOUT });
    router.transitionTo(['/login', { redirectTo: stringifyLocation(router.state.location)}]);
  }
}

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
  func: () => userApi.user.fetch(),
  start: fetchUserProfileStart,
  success: fetchUserProfileSuccess,
  failure: fetchUserProfileFailure,
});

/**
 * Register User: POST
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const registerUserType = 'registerUser';
export const registerUserStart = startAction(registerUserType);
export const registerUserSuccess = successAction(registerUserType);
export const registerUserFailure = failureAction(registerUserType);
export const registerUser = asyncAction({
  func: (userData) => userApi.user.register(),
  start: registerUserStart,
  success: registerUserSuccess,
  failure: registerUserFailure,
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
  func: (user, password) => userApi.user.login(),
  start: loginUserStart,
  success: loginUserSuccess,
  failure: loginUserFailure,
});

/**
 * Update User Profile on server: PUT
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const updateUserProfileType = 'updateUserProfile';
export const updateUserProfileServerStart = startAction(updateUserProfileType);
export const updateUserProfileServerSuccess = successAction(updateUserProfileType);
export const updateUserProfileServerFailure = failureAction(updateUserProfileType);
export const updateUserProfileServer = asyncAction({
  func: (id, content) => userApi.user.updateProfile(id, content),
  start: updateUserProfileServerStart,
  success: updateUserProfileServerSuccess,
  failure: updateUserProfileServerFailure,
});