import {
   UPDATE_USER, LOGOUT, AUTH_PENDING,
    AUTH_SUCCESS, AUTH_FAILURE,
    CHECK_SESSION
} from '../actions/user';
import { dissoc, without, merge, prepend } from 'ramda';
import { eraseStorage, getSessionItem } from '../utils/lib/sessionUtils';

/**
 *
 * @type {{error: null, token: null, userObj: null, displayName: null}}
 */
const initialState = {
  error: null, // last occurred error
  token: null,
  userObj: null,
  displayName: null,
};

/**
 *
 * @param state
 * @param type
 * @param payload
 * @param meta
 * @param error
 * @returns {*}
 */
export const user = (state = initialState, { type, payload, meta, error }) => {
  switch(type){
      // saves the token into the redux store && session storage
    case CHECK_SESSION:
      return merge(state, {
        displayName: payload.user,
        token: payload.token,
        userId: payload.userId
      })

    case AUTH_SUCCESS:
      if ( meta.done && !error) {
          if (payload.token) {
            sessionStorage.setItem('token', payload.token);
            sessionStorage.setItem('username', payload.user.displayName);
            sessionStorage.setItem('userId', payload.user._id);
          }
        return merge(state, {
          token: payload.token,
          userId: payload.user._id,
          displayName: payload.user.displayName,
        });
      }
      return state;

    // Saves error in redux store to display to user
    case AUTH_FAILURE:
      if ( meta.done && error ){
        return merge(state, {
          error: payload.error
        });
      }
      return state;

    // discards the current token & profile (logout)
    case LOGOUT:
      eraseStorage();
      return { ...initialState };


    // saves the current user
    case UPDATE_USER:
      return merge(state, { [payload.user]: user });

    case 'updateUserServer':
    case 'fetchUserProfile':
      if ( meta.done && !error) {
        return merge(state, { [payload.user]: user });
      }
      return state;

    // as always, on default do nothing
    default:
      return state;
  }
};

/**
 *
 * @param state
 * @param type
 * @param payload
 * @param route
 * @returns {*}
 */
export const requests = ( state = {},  {type, payload, route }) => {
  switch (type) {
    case AUTH_PENDING:
      return merge(state, { route: { status: 'pending', error: null}});
    case AUTH_SUCCESS:
      return merge(state, { route: { status: 'success', error: null}});
    case AUTH_FAILURE:
      return merge(state, { route: { status: 'failure', error: payload.error}});
    default:
      return state;
  }
};
