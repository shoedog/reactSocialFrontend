import { dissoc, without, merge, prepend } from 'ramda';
import { OPEN_FEED_ITEM, CLOSE_FEED_ITEM, UPDATE_FEED_ITEM } from '../actions/stream';

/**
 * See lib/selectors.js for functions to sort/select items using byId, ids, openFeedItemId
 * Reducers use parts of ramda library ( like lodash but pure functional lib )
 */

// Reducer for a feed item Object (byId) in state
export const byId = (state = {}, { type, payload, meta, error }) => {
  switch (type) {
    case 'fetchFeedItems':
      if (meta.done && !error) {
        return payload.feedItems;
      }
      return state;
    case 'addFeedItem':
      if (meta.done && !error) {
        return merge( state, { [payload.id]: payload });
      }
      return state;
    case UPDATE_FEED_ITEM:
      return merge(state, { [payload.id]: payload});
    case 'updateFeedItemServer':
      if(meta.done && !error) {
        return merge(state, { [payload.id]: payload });
      }
      return state;
    case 'removeFeedItem':
      if(meta.done && !error) {
        return dissoc(payload.id, state);
      }
      return state;
    default:
      return state;
  }
};

// Reducer for feed items ids Array in state
export const ids = (state = [], { type, payload, meta, error}) => {
  switch (type) {
    case 'fetchFeedItems':
      if (meta.done && !error) {
        return payload.feedItemIds;
      }
      return state;
    case 'addFeedItem':
      if (meta.done && !error) {
        return prepend(payload.id, state);
      }
      return state;
    case 'removeFeedItem':
      if(meta.done && !error) {
        return without(payload.id, state);
      }
      return state;
    default:
      return state;
  }
};

// Reducer for the id of the currently open feed item in state
export const openFeedItemId = (state = null, { type, payload, meta, error}) => {
  switch (type) {
    case 'addFeedItem':
      if (meta.done && !error) {
        return payload.id;
      }
      return state;
    case OPEN_FEED_ITEM:
      return payload.id;
    case CLOSE_FEED_ITEM:
      return null;
    case 'removeFeedItem':
      if(meta.done && !error) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

export default {
  byId,
  ids,
  openFeedItemId,
};