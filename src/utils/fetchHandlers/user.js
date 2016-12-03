import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';
import { checkStatus, fetchJson } from '../lib/fetchUtils';

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
    register(username, email, password) {
      //console.log("req sent");
      return fetchJson(
        'http://54.212.196.159:5000/user',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: JSON.stringify({ username, email, password }),
        }
      )
    },

    login(username, password) {
      return fetchJson(
        `http://54.212.196.159:5000/user/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: JSON.stringify({ username, password }),
        }
      )
    },

    fetch(username) {
      return fetchJson(`http://54.212.196.159:5000/user/${username}`)
      //.then(objConvert)
        .then(normalizeUserData)
        .then(returnUserData);
    },

    updateUser(username, userData) {
      return fetchJson(
        `http://54.212.196.159:5000/user/${username}`,
        {
          method: 'PUT',
          body: JSON.stringify({ userData }),
        }
      );
    },

    delete(userId, userToken) {
      return fetch(`http://54.212.196.159:5000/user/${userId}`,
        {
          method: 'DELETE',
          headers: {          
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Bearer' + userToken
            }
        })
        .then(checkStatus)
        .then((res) => res.text());
    },
  },
};
