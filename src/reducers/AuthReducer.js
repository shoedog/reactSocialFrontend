import {
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
} from '../actions/auth';

import { ROUTER_STATE_CHANGE } from '../actions/router';

const initialState = {
  error: null, // last occurred error
  token: null,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE:
      return {
        ...state,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.token
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case LOGOUT:
      return { ...initialState };

    //case SAVE_PROFILE:
    //case SAVE_PROFILE_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, ...action.user },
        error: null
      };

    default:
      return state;
  }
};
