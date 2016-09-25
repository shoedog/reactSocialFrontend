import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.babel';
import path from 'path';
const port = process.env.PORT || 8080;

const app = express();

// Detect node environment.
global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

// Use hot loading middleware
if (!process.env.NODE_ENV) {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

// Serve static files.
app.use(express.static(path.resolve(__dirname, '../build/')));

// Serve index page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});


// Launch server.
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> The magic happens on port %s!', port);
});
