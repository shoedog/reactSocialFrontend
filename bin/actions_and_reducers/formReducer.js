import { FORM_UPDATE_VALUE, FORM_RESET } from '../actions/formActions';
import { merge } from 'ramda';

const initialState = { //define initial state - an empty form
  values: {}
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FORM_UPDATE_VALUE:
      return merge(state, {[action.name]: action.value});

    case FORM_RESET:
      return initialState;

    default:
      return state;
  }
}