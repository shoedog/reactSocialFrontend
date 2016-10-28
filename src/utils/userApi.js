import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
import { checkStatus, fetchJson } from './apiUtils';

// Create  schema for normalizr
const userProfileData = new Schema('userProfileData');

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
export const normalizeUserData = (data) => normalize(data, arrayOf(userProfileData));

// Process object returned from normalizeSongList into feedItems and feedItemIds
export const returnUserData = ({ entities: {userProfileData}, result: userProfileItems }) => ({
  userProfileData,
  userProfileItems,
});

export default {
  user: {
    register(userData) {
      return fetchJson(
        '/user/register',
        {
          method: 'POST',
          body: JSON.stringify({ userData }),
        }
      );
    },

    login(user, password) {
      return fetchJson(
        `/user/login`,
        {
          method: 'POST',
          body: JSON.stringify({ user, password }),
        }
      );
    },

    fetch() {
      return fetchJson('/user')
      //.then(objConvert)
        .then(normalizeUserData)
        .then(returnUserData);
    },

    updateProfile(id, profile) {
      return fetchJson(
        `/user/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ user, profile }),
        }
      );
    },

    delete(id) {
      return fetch(`/user/${id}`,
        {
          method: 'DELETE'
        })
        .then(checkStatus)
        .then((res) => res.text());
    },
  },
};