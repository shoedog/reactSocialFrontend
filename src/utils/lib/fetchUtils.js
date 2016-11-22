import 'isomorphic-fetch';

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