/*
 So that Redux can pick up multiple reducers in the future,
 you’ll want also to have a reducers/index.js:

 Since we only have one reducer in this app, this isn’t that useful,
 but it’s a nice structure to have.
 */
import { combineReducers } from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);

export default rootReducer;
