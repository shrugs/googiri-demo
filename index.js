'use strict';

let axios = require('axios');
let express = require('express');
let app = express();

let WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;
let IFTTT_MAKER_KEY = process.env.IFTTT_MAKER_KEY;

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
    // let's find the message we want to send
    let messageBody = response.data.outcomes[0].entities.message_body[0].value;
    console.log(`Announcing to slack: ${messageBody}`);
    return messageBody;
  })
  .then(function(message) {
    // lets tell IFTTT to post the message
    return axios.get(`https://maker.ifttt.com/trigger/incoming_slack_message/with/key/${IFTTT_MAKER_KEY}`, {
      params: {
        'value1': 'Matt wants to say:',
        'value2': message,
      },
    });
  })
  .then(function(response) {
    console.log(response.data);
    // the request was successful!
    res.json({
      title: 'Successfully Posted to Slack',
      text: 'You\'ve just hooked up Googiri, wit.ai, IFTTT, and Slack!',
    });
  })
  .catch(function(err) {
    console.error(err);
    res.send('OH NOES');
  });

});

let server = app.listen(8000, function () {
  console.log(`listening on localhost:${server.address().port}`);
});
