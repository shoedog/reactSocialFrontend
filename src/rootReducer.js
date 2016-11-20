import { combineReducers } from 'redux';
import LaunchPageReducer from './reducers/launchPage';
import RouterReducer from './reducers/router';
import AuthReducer from '../bin/actions_and_reducers/AuthReducer';
import { byId, ids, openFeedItemId } from './reducers/stream';
import { user, requests, checkSession } from './reducers/user';

const reducers = {
  launchPage: LaunchPageReducer,
  router: RouterReducer,
  user: user,
  requests: requests,
  byId: byId,
  ids: ids,
  session: checkSession,
  openFeedItemId: openFeedItemId
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
