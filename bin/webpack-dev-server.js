var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');

//const { HOST, PORT, WEBPACK_PORT } = require('../tools/config');
const webpackConfig = require('../devConfig');
const compiler = webpack(webpackConfig);
const serverOptions = {
  serverSideRender: true,
  contentBase: path.resolve(__dirname, '../src'),  //Server renders & provides content
  quiet: true,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  filename: 'bundle.js',
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = express();
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr'
}));

/*
app.get('/', function (req, res) {
  res.send('<script src=\'/bundle.js\'></script>');
});
*/
var server = app.listen(3002, (err) => {
  if (err) {
    console.error(err);
  } else {
    var host = server.address().address;
    var port = server.address().port;
    console.info(`Webpack development server listening at http://${host}:${port}`);
  }
});
