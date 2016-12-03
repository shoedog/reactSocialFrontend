import { normalize, Schema, arrayOf } from 'normalizr';
import { checkStatus, fetchJson } from '../lib/fetchUtils';

// Create  schema for normalizr
const feedItems = new Schema('feedItems');

// Process data from fetch:
export const normalizeFeedItems = (data) => normalize(data, arrayOf(feedItems));

// Process object returned from normalizeSongList into feedItems and feedItemIds
export const returnFeedItemsAndIds = ({ entities: {feedItems}, result: feedItemIds }) => ({
  feedItems,
  feedItemIds,
});

export default {
  feedItems: {
    fetchFeed() {
      let options = { method: 'GET'};
      const loggedIn = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (loggedIn) {
        options.headers = {
          Authorization: 'Bearer ' + loggedIn
        }
      }
      return fetchJson(`http://54.212.196.159:5000/social/feed/${userId}`, options)
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
