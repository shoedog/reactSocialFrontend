import api from '../utils/fetchHandlers/feed';
import { startAction, successAction,
  failureAction, asyncAction } from '../utils/lib/asyncActionUtils';

export const OPEN_FEED_ITEM = 'OPEN_FEED_ITEM';
export const CLOSE_FEED_ITEM = 'CLOSE_FEED_ITEM';
export const UPDATE_FEED_ITEM = 'UPDATE_FEED_ITEM';

// Synchronous local action: opens a specific item
export const openFeedItem = (id: '') => ({
  type: OPEN_FEED_ITEM,
  payload: { id },
});

// Synchronous local action: closes a specific item
export const closeFeedItem = () => ({
  type: CLOSE_FEED_ITEM,
});

// Synchronous local action: updates an item locally
export const updateFeedItem = (content, id) => ({
  type: UPDATE_FEED_ITEM,
  payload: {
    id,
    content,
  },
});

/**
 * Fetch Feed Items from server: GET
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const fetchFeedItemsType = 'fetchFeedItems';
export const fetchFeedItemsStart = startAction(fetchFeedItemsType);
export const fetchFeedItemsSuccess = successAction(fetchFeedItemsType);
export const fetchFeedItemsFailure = failureAction(fetchFeedItemsType);
export const fetchFeedItems = asyncAction({
  func: () => api.feedItems.fetchFeed(),
  start: fetchFeedItemsStart,
  success: fetchFeedItemsSuccess,
  failure: fetchFeedItemsFailure,
});

/**
 * Add feedItem to server: POST
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const addFeedItemType = 'addFeedItem';
export const addFeedItemStart = startAction(addFeedItemType);
export const addFeedItemSuccess = successAction(addFeedItemType);
export const addFeedItemFailure = failureAction(addFeedItemType);
export const addFeedItem = asyncAction({
  func: (content) => api.feedItems.add(),
  start: addFeedItemStart,
  success: addFeedItemSuccess,
  failure: addFeedItemFailure,
});

/**
 * Update feedItem on server: PUT
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const updateFeedItemServerType = 'updateFeedItemServer';
export const updateFeedItemServerStart = startAction(updateFeedItemServerType);
export const updateFeedItemServerSuccess = successAction(updateFeedItemServerType);
export const updateFeedItemServerFailure = failureAction(updateFeedItemServerType);
export const updateFeedItemServer = asyncAction({
  func: (id, content) =>
    api.feedItems.update(id, content),
  start: updateFeedItemServerStart,
  success: updateFeedItemServerSuccess,
  failure: updateFeedItemServerFailure,
});

/**
 * Remove feedItem from server: DELETE
 * Action Type, start, success, failure, and async actions
 * using helpers from asyncActionUtils.js
 */
const removeFeedItemType = 'removeFeedItem';
export const removeFeedItemStart = startAction(removeFeedItemType);
export const removeFeedItemSuccess = successAction(removeFeedItemType);
export const removeFeedItemFailure = failureAction(removeFeedItemType);
export const removeFeedItem = asyncAction({
  func: (id) => api.feedItems.delete(id).then(() => ({ id })),
  start: removeFeedItemStart,
  success: removeFeedItemSuccess,
  failure: removeFeedItemFailure,
});