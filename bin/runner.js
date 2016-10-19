require('babel-core/register')({
  presets: ['es2015', 'react', 'stage-1'],
});
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};
require('babel-polyfill');

require('./renderingServer.js');
