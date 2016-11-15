import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function LaunchPageReducer(state = defaultState, action) {

  switch (action.type) {

    case 'USER_LOGIN':
      return new Immutable.List(action.res.data);

    default:
      return state;
  }
}
