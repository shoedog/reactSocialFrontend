import {
  ROUTER_STATE_CHANGE
} from '../actions/router';

export default (state = null, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE:
      return action.state;

    default:
      return state;
  }
};
