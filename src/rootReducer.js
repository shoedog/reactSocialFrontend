import { combineReducers } from 'redux';
import LaunchPageReducer from './reducers/launchPage';
import RouterReducer from './reducers/router';
import AuthReducer from '../bin/actions_and_reducers/AuthReducer';
import { byId, ids, openFeedItemId } from './reducers/stream';
import { user } from './reducers/user';

const reducers = {
  launchPage: LaunchPageReducer,
  router: RouterReducer,
  user: user,
  byId: byId,
  ids: ids,
  openFeedItemId: openFeedItemId
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
