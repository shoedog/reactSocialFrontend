/* eslint no-console: 0 */
import express from 'express';
import { API_PORT } from '../tools/config';
const tweetFeed = require('../tweets.json');
//console.log(tweetFeed);

const app = express();

app.get('/', (req, res) => {
  res.send('API Index Path!');
});

app.get('/social/feed', (req, res) => {
  // We can modify response here
  // Or in src/utils/api.js
  /*const tweets = tweetFeed.map((json) => {
    var rObj = {};
    var obj = JSON.parse(json);
    rObj['id'] = obj.id_str;
    rObj['content'] = obj.text;
    return rObj;
  });
  console.log(tweets);
  res.status(200).send(Object.keys(tweets)
    .map((key) => tweets[key]));*/
  res.send(tweetFeed);
});

app.get('/api', (req, res) => {
  res.send('Hello, API!');
});

app.listen(API_PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Api listening on port ${API_PORT}!`);
  }
});
