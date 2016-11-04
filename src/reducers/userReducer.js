import {
  OPEN_PROFILE, CLOSE_PROFILE, UPDATE_USER,
  REGISTER_USER, LOGOUT, SET_TOKEN, DISCARD_TOKEN
} from '../actions/userActions';
import { dissoc, without, merge, prepend } from 'ramda';

import { ROUTER_STATE_CHANGE } from '../actions/router';

const initialState = {
  error: null, // last occurred error
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch(action.type){
    case ROUTER_STATE_CHANGE:
      return {
        ...state,
        error: null
      };

      // saves the token into the state
    case 'registerUserServer':
    case 'loginUser':
      if ( meta.done && !error) {
        return merge(state, { [payload.token]: token} );
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
}
