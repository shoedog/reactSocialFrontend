import Immutable from 'immutable';

/*
 Here we use an Immutable List object to store our state
 (though a more complex app would probably have a more elaborate structure),
 and return a newly transformed version depending on the action.

 Redux isn’t very opinionated, and only has two expectations of its redeucers:
 1. The reducer has the signature (state, action) => newState.
 2. The reducer does not mutate the state it is given, but returns a new one
 */

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return new Immutable.List(action.res.data);

    case 'CREATE_TODO':
      return state.concat(action.res.data.text);

    case 'EDIT_TODO':
      return state.set(action.id, action.text);

    case 'DELETE_TODO':
      return state.delete(action.id);

    default:
      return state;
  }
}
