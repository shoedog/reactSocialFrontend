import Promise     from 'bluebird';
import webpackAssets from '../Assets/webpack-assets.json';
import clientConfig  from '../src/config';

export function fetchComponentsData({ dispatch, components, params }) {
  const promises = components.map(current => {
    const component = current.WrappedComponent ? current.WrappedComponent : current;

    return component.fetchData
      ? component.fetchData({ dispatch, params })
      : null;
  });

  return Promise.all(promises);
}

export function getAssetsPaths() {
  return {
    js:  webpackAssets.client.js,
    css: webpackAssets.client.css
  };
}