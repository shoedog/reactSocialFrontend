/**
 * These are used in components to select items needed
 * just import the selectors and attach to either an individual item or an item list
 */

/**
 * This maps the feedItems to an array of ids
 * Used for a list of items
 */
export const getFeedItems = (state) =>
  state.ids.map((id) => state.byId[id]);

/**
 * Sets the open feedItem id in state
 * used for an individual selected item in a list
 */
export const getOpenFeedItemId = (state) =>
  state.openFeedItemId;

/**
 * Gets the id of an item to get the item
 * Used for individual items
 */
export const getFeedItem = (state, id) =>
  state.byId[id] || null;