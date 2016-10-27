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

app.route('/feedItems')
  .get( (req, res, next) => {
  //For testing/mocking components, just get local file
  const fs = require('fs');
  const tweetFeed = require('./tweets.json');

  if(req.err) {
    var returnStatus = 500;
    if (req.err.code === 'ConditionalCheckFailedException') {
      returnStatus = 409;
    }
    res.status(returnStatus).end();
    console.log('DDB Error: ' + req.err);
  } else {
    // For some reason JSON.parse for the whole file was giving errors...
    // So I parsed each object and just extracted the text and id.
    const tweets = tweetFeed.map((json) => {
      var rObj = {};
      obj = JSON.parse(json);
      rObj['id'] = obj.id_str;
      rObj['content'] = obj.text;
      return rObj;
    });
    console.log(tweets);
    res.status(200).send(Object.keys(tweets)
      .map((key) => tweets[key]));
  }
  next();
});

app.get(['/', '/login', '/about', '/stream', '/404'], function (req, res) {
  res.status(200).send(`
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
