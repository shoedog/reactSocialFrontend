const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const utils = require('./../env');
const { StringDecoder } = require('string_decoder');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('../../webpack.config.js');
const Express = require('express');
const app = new Express();
const port = process.env.PORT || 9999;
const compiler = webpack(clientConfig);


let bundleStart = null;
let webpackFs;


// Webpack starts bundling
compiler.plugin('compile', function () {
  bundleStart = Date.now();
});

// Webpack is done compiling
compiler.plugin('done', function () {
  console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');

  webpackFs = compiler.outputFileSystem;
  processRequests();
});

const WebPackMiddleware = webpackDevMiddleware(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  colors: true,
  headers: {'X-Webpack-Rendered': 'yes'},
  noInfo: true,
  publicPath: clientConfig.output,
  serverSideRender: true
});

const query = function (path, cb) {
  requests.push({path, cb});
  processRequests();
};

const HotReloadMiddleware = webpackHotMiddleware(compiler);

function processRequests() {
  if (!webpackFs) {
    return;
  }

  let req = requests.pop();

  if (!req) {
    return;
  }

  webpackFs.readFile(webpackConfig.output.path + '/' + req.path, function (err, data) {
    req.cb(err, decoder.write(data));
  });

  processRequests();
}

module.exports =  {
  WebPackMiddleware,
  query,
  HotReloadMiddleware
};



