const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('./webpack.config');
const Express = require('express');
const app = new Express();
const port = process.env.PORT || 9999;
const compiler = webpack(clientConfig);
const dev = webpackDevMiddleware(compiler, { noInfo: true, publicPath: clientConfig.output });
const hot = webpackHotMiddleware(compiler);

app.use(dev);
app.use(hot);

app.get('*', function (req, res) {
  res.send(`
    <html>
      <head>
        <title>Webpack Development Server</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">Hello World</div>
      </body>
      <script type="application/javascript" src="/client.js" async defer></script>
    </html>
  `);
});

app.listen(port, (error) => {
  if (error) { console.error(error); return; }
  console.info('Open up http://localhost:%s/ in your browser.', port);
});
