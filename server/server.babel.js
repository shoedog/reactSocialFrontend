import express from 'express';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.babel';
import path from 'path';


new webpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  contentBase: './build',
  hot: true,
  historyApiFallback: false
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('==> listening at http://localhost:8080/');
});
