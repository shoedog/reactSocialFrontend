import fetch from 'isomorphic-fetch';

const IP = process.env.NODE_ENV === 'production' ? 'http://54.212.196.159:5000' : 'http://54.212.196.159:5000';

export const getFeed = (req, res) => {
  fetch('http://54.212.196.159:5000/social/feed', {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })
    .then( (pres) => {
      return pres.json();
    })
    .then( (data) => {
      res.send(data);
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const postFeedItem = (req, res) => {
  console.log(req.body);
  fetch('http://54.212.196.159:5000/social/feed', {
    'method': 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: req.body
  })
    .then( (pres) => {
      return res.send(pres.json());
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const updateFeedItem = (req, res) => {
  fetch('http://54.212.196.159:5000/social/feed/:id', {
    'method': 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: req.body
  })
    .then( (pres) => {
      return res.send(pres.json());
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const deleteFeedItem = (req, res) => {
  fetch('http://54.212.196.159:5000/social/feed/:id', {
    'method': 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: req.params.id
  })
    .then( () => {
      return res.status(200).send();
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

