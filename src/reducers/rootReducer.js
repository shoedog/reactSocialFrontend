/*
 So that Redux can pick up multiple reducers in the future,
 you’ll want also to have a reducers/index.js:

 Since we only have one reducer in this app, this isn’t that useful,
 but it’s a nice structure to have.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LaunchPageReducer from './LaunchPageReducer';
import RouterReducer from './RouterReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  LaunchPageReducer,
  RouterReducer,
  AuthReducer,
  formReducer,
});

export default rootReducer;
