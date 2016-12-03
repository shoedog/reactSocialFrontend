import fetch from 'isomorphic-fetch';

export const getUsers = (req, res) => {
  fetch('http://54.212.196.159:5000/user', {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })
    .then( (pres) => {
      return res.send(pres.json());
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const getUser = (req, res, username) => {
  fetch(`http://54.212.196.159:5000/user/${username}`, {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })
    .then( (pres) => {
      return res.send(pres.json());
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const registerUser = (req, res) => {
  console.log(req.body);
  fetch('http://54.212.196.159:5000/user', {
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

export const loginUser = (req, res) => {
  fetch('http://54.212.196.159:5000/user/login', {
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
      alert(err);
      res.end(err);
    });
};

export const updateUser = (req, res, username) => {
  fetch(`http://54.212.196.159:5000/user/${username}`, {
    'method': 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: req.body
  })
    .then( (pres) => {
      console.log('success');
      return res.send('success');
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const deleteUser = (req, res, username) => {
  fetch(`http://54.212.196.159:5000/user/${username}`, {
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