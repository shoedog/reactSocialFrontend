import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LaunchPageReducer from './LaunchPageReducer';
import RouterReducer from './RouterReducer';
import AuthReducer from './AuthReducer';
import { byId, ids, openFeedItemId } from './streamReducers';

const reducers = {
  launchPage: LaunchPageReducer,
  router: RouterReducer,
  auth: AuthReducer,
  byId: byId,
  ids: ids,
  openFeedItemId: openFeedItemId,
  form: formReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
