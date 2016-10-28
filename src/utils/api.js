import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
import { checkStatus, fetchJson } from './apiUtils';

// Create  schema for normalizr
const feedItems = new Schema('feedItems');

// Modify response for props
// We can do it here or on server
export const objConvert = (data) => {
  return data.map((json) => {
    var rObj = {};
    var obj = JSON.parse(json);
    rObj['id'] = obj.id_str;
    rObj['content'] = obj.text;
    return rObj;
  });
};

// Process data from fetch:
export const normalizeFeedItems = (data) => normalize(data, arrayOf(feedItems));

// Process object returned from normalizeSongList into feedItems and feedItemIds
export const returnFeedItemsAndIds = ({ entities: {feedItems}, result: feedItemIds }) => ({
  feedItems,
  feedItemIds,
});

export default {
  feedItems: {
    fetch() {
      return fetchJson('/feedItems')
        //.then(objConvert)
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