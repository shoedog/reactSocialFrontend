import express from 'express';
import httpProxy from 'http-proxy';
import HttpProxyRules from 'http-proxy-rules';
import http from 'http';
import React from 'react';
import passport from 'passport';
import render from './routes/handleRender';
//import fetch from 'isomorphic-fetch';
import { getFeed, postFeedItem,
  updateFeedItem, deleteFeedItem } from './routes/feedItemsApi';
import { getUsers, getUser, registerUser,
  loginUser, updateUser, deleteUser } from './routes/userRoutes';
import * as socialRoutes from './routes/socialRoutes';

const app = express();
let router = express.Router();
const server = new http.Server(app);
app.use(express.static('public/static/dist'));
app.use('/static', express.static('/public/static'));
// required for passport
app.use(session({ secret: 'moonwalkissweet' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Transform routes to target routes for proxy service
//const proxyRules = new HttpProxyRules({
//  rules: {
//    '.*/feedItems': `http://localhost:5000/social/feed`
/*  },
  default: `http://localhost:5000`
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
});*/

// Social Routes
socialRoutes(app, passport);

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

app.route('/user/:username')
  .get( (req, res) => {
    let username = req.params.username;
    getUser(req, res, username);
  })
  .put( (req, res) => {
    let username = req.params.username;
    updateUser(req, res, username);
  })
  .delete( (req, res) => {
    let username = req.params.username;
    deleteUser(req, res, username);
  });

app.route('/user')
  .get( (req, res) => {
    getUsers(req, res);
  })
  .post( (req, res) => {
    registerUser(req, res);
  });

app.post('/user/login', loginUser);


app.use('/feedItems', router);

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

