import express from 'express';
import httpProxy from 'http-proxy';
import HttpProxyRules from 'http-proxy-rules';
import http from 'http';
import React from 'react';
import render from './routes/handleRender';
//import fetch from 'isomorphic-fetch';
import { getFeed, postFeedItem,
  updateFeedItem, deleteFeedItem } from './routes/feedItemsApi';

const app = express();
const server = new http.Server(app);
app.use(express.static('public/static/dist'));
app.use('/static', express.static('/public/static'));

// Transform routes to target routes for proxy service
const proxyRules = new HttpProxyRules({
  rules: {
    '.*/feedItems': `http://0.0.0.0:5000/social/feed`
  },
  default: `http://0.0.0.0:5000`
});
const proxy = httpProxy.createProxy();

// Proxy error handling
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

// Api Proxy Requests
app.route('/feedItems')
  .get( (req, res) => {
    getFeed(req, res);
  })
  .post( (req, res) => {
    postFeedItem(req, res);
  })
  .put( (req, res) => {
    updateFeedItem(req, res);
  })
  .delete( (req, res) => {
    deleteFeedItem(req, res);
  });

// Append view routes here i.e. routes from routes.js
app.get(['/', '/login', '/about', '/stream'], render);

// 404 Page
app.get('*', render);

const PORT = process.env.PORT || 3000;

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server listening on: ${PORT}`);
});

