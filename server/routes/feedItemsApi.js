import fetch from 'isomorphic-fetch';

const IP = process.env.NODE_ENV === 'production' ? 'http://54.212.196.159:5000' : 'http://0.0.0.0:5000';

export const getFeed = (req, res) => {
  fetch('http://localhost:5000/social/feed', {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })
    .then( (pres) => {
      return pres.json();
    })
    .then( (data) => {
      /*var body = data.map((json) => {
        return JSON.parse(json);
        var rObj = {};
        rObj['id'] = obj.id_str;
        rObj[obj] = obj;

        rObj['id'] = obj.id_str;
        rObj['content'] = obj.text;
        rObj['tweeter'] = obj.user;
        rObj['profileImage'] = obj.profile_image_url;
        rObj['favCount'] = obj.favorite_count;
        rObj['retweetCount'] = obj.retweet_count;
        rObj['retweeted'] = obj.retweeted;
        rObj['favorited'] = obj.favorited;
        return rObj;
       return obj;
      });*/
      res.send(data);
    })
    .catch( (err) => {
      console.log(err);
      res.end(err);
    });
};

export const postFeedItem = (req, res) => {
  console.log(req.body);
  fetch('http://localhost:5000/social/feed', {
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
  fetch('http://localhost:5000/social/feed/:id', {
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
  fetch('http://localhost:5000/social/feed/:id', {
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

// Using http-proxy. Manually implementing proxy using fetch
// was faster: 1.16 ms with fetch vs 2.34 with proxy
/*
 var target = proxyRules.match(req);
 if (target) {
 proxy.web(req, res, {target: target});
 } else {
 res.writeHead(500, { 'Content-Type': 'text/plain' });
 res.status(returnStatus).end('The request url and path did not match any resources');
 console.log('DDB Error: ' + req.err);
 }
 */
