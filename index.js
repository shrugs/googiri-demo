'use strict';

let axios = require('axios');
let express = require('express');
let app = express();

let WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;

app.get('/', function (req, res) {

  // Now that we have the query,
  // lets ask wit to parse it and return some helpful information
  axios({
    url: 'https://api.wit.ai/message',
    method: 'GET',
    params: {
      v: '20160202',
      q: req.query.q,
    },
    headers: {
      'Authorization': `Bearer ${WIT_AI_TOKEN}`,
    },
  })
  .then(function(response) {
    // for now, just print the response data
    console.log(response.data);
  })
  .then(function() {
    // tell Googiri we're done by completing the request
    res.send('OK');
  })
  .catch(function(err) {
    console.error(err);
    res.send('Hello World!');
  });

});

let server = app.listen(8000, function () {
  console.log(`listening on localhost:${server.address().port}`);
});
