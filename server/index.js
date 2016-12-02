import express from 'express';
import http from 'http';
import React from 'react';
import passport from 'passport';
import render from './routes/handleRender';
//import fetch from 'isomorphic-fetch';
import { getFeed, postFeedItem,
  updateFeedItem, deleteFeedItem } from './routes/feedItemsApi';
import { getUsers, getUser, registerUser,
  loginUser, updateUser, deleteUser } from './routes/userRoutes';

const app = express();
let router = express.Router();
const server = new http.Server(app);
app.use(express.static('public/static/dist'));
app.use('/static', express.static('/public/static'));

// Mounting for SSR
app.get(['/'], render);

// Social Routes
//socialRoutes(app, passport);

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
app.get('/auth/twitter', passport.authenticate('twitter'));
// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/feedItems',
      failureRedirect : '/'
    }));

app.use('/feedItems', router);

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

