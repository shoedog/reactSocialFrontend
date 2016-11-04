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
export const normalizeUserData = (data) => normalize(data, arrayOf(userData));

// Process object returned from normalizeUserData into userData and userDataIds
export const returnUserData = ({ entities: {userData}, result: userDataIds }) => ({
  userData,
  userDataIds,
});

export default {
  USER: {
    register(email, password) {
      return fetchJson(
        '/user/register',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );
    },

    login(email, password) {
      return fetchJson(
        `/user/login`,
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );
    },

    fetch(id) {
      return fetchJson(`/user/${id}`)
      //.then(objConvert)
        .then(normalizeUserData)
        .then(returnUserData);
    },

    updateUser(id, userData) {
      return fetchJson(
        `/user/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ userData }),
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