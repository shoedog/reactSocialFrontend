import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';

// Create  schema for normalizr
const feedItems = new Schema('feedItems');

// Utility to convert response stream from fetch to JSON
export const toJson = (res) => res.json();

// Utility for bad status code for fetch
// ( fetch promises by default are only rejected if connection fails )
export const checkStatus = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }

  return Promise.reject(new Error(res.statusText || res.status));
};

// Wrapper for fetch to call checkStatus() and toJson()
export const fetchJson = (url, options = {}) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(toJson)
);

// Process data from fetch:
export const normalizeFeedItems = (data) => normalize(data, arrayOf(feedItems));

// Process object returned from normalizeSongList into songs and songdIds
export const returnFeedItemsAndIds = ({ entities: {feedItems}, result: feedItemIds }) => ({
  feedItems,
  feedItemIds,
});

export default {
  feedItems: {
    fetch() {
      return fetchJson('/feedItems')
        .then(normalizeFeedItems)
        .then(returnFeedItemsAndIds);
    },

    add(content) {
      return fetchJson(
        '/feedItems',
        {
          method: 'POST',
          body: JSON.stringify({ content }),
        }
      );
    },

    update(id, content) {
      return fetchJson(
        `/feedItems/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ content }),
        }
      );
    },

    delete(id) {
      return fetch(`/feedItems/${id}`,
        {
          method: 'DELETE'
        })
        .then(checkStatus)
        .then((res) => res.text());
    },
  },
};