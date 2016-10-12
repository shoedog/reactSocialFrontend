import { stringifyQuery } from 'react-router';

export default function stringifyLocation(location) {
  const query = stringifyQuery(location.query);

  return `${location.pathname}${query && `?${query}`}`;
}
