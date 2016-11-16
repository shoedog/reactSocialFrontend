import {
   UPDATE_USER, LOGOUT, AUTH_PENDING,
    AUTH_SUCCESS, AUTH_FAILURE
} from '../actions/user';
import { dissoc, without, merge, prepend } from 'ramda';

import { ROUTER_STATE_CHANGE } from '../actions/router';

const initialState = {
  error: null, // last occurred error
  token: null,
  user: null,
};

export const user = (state = initialState, { type, payload, meta, error }) => {
  switch(type){
    case ROUTER_STATE_CHANGE:
      return {
        ...state,
        error: null
      };


      // saves the token into the redux store && session storage
    case AUTH_SUCCESS:
      if ( meta.done && !error) {
          if (payload.token) {
            sessionStorage.setItem('token', payload.token);
            sessionStorage.setItem('username', payload.user.displayName);
          }
        return merge(state, {
          token: payload.token,
          user: payload.user,
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

