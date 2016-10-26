// This was just to mess around with parsing the json before
// adding it to the server

const fs = require('fs');
const tweets = require('./tweets.json');
//const feed = require('./tweetFeed.json');

//const stringify = (JSON.stringify(tweets));
//const parse = JSON.parse(stringify);
function readJson(callback){
  fs.readFile('./response-export.json', 'utf8', function(err, data) {
    if(err) {
      console.log('Err: ' + err);
      return callback(err);
    }
    return parseData(data, callback);

  });
}

function parseData(data){
  var objJSON = data.map((json) => {
    var rObj = {};
    obj =  JSON.parse(json);
    rObj['id'] = obj.id_str;
    rObj['text'] = obj.text;
    return rObj;
  });
  /*var feedData = objJSON.map( (obj) => {
    var rObj = {};
    rObj['id'] = obj.id_str;
    rObj['text'] = obj.text;
    return rObj;
  });*/
  console.log(objJSON[0].text);
  //console.log(feedData);
}

function getText(callback){
  fs.readFile('./tweetFeed.json', 'utf8',(err, data) => {
  if (err) throw err;
  //for( var key in data ) {
    console.log(`text: ${data[0]}`);
    console.log(`text: ${data[1]}`);
    console.log(`text: ${data[2]}`);
  //}
  return callback;
  })
}

//readJson();
//parseData(tweets);
var objJSON = tweets.map((json) => {
  var rObj = {};
  obj =  JSON.parse(json);
  rObj['id'] = obj.id_str;
  rObj['text'] = obj.text;
  return rObj;
});

console.log(objJSON[0].text);