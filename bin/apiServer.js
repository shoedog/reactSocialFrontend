/* eslint no-console: 0 */
import express from 'express';
import { API_PORT } from '../tools/config';

const app = express();

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
