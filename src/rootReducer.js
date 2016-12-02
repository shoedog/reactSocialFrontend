import { combineReducers } from 'redux';
import LaunchPageReducer from './reducers/launchPage';
import RouterReducer from './reducers/router';
import { sentimentGroup } from './reducers/sentiment';
import { byId, ids, openFeedItemId } from './reducers/stream';
import { user, requests, checkSession } from './reducers/user';

/**
 *
 * @type {{launchPage: LaunchPageReducer, router: Function, user: user, requests: requests, byId: byId, ids: ids, sentimentByid: *, openFeedItemId: openFeedItemId}}
 */
const reducers = {
    launchPage: LaunchPageReducer,
    router: RouterReducer,
    user: user,
    requests: requests,
    byId: byId,
    ids: ids,
    sentimentGroup: sentimentGroup,
    //sentimentTweets: sentimentTweets,
    //session: checkSession,
    openFeedItemId: openFeedItemId
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
