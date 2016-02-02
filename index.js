'use strict';

let express = require('express');
let app = express();

app.get('/', function (req, res) {

  console.log(req.query);

  res.send('Hello World!');
});

let server = app.listen(8000, function () {
  console.log(`listening on localhost:${server.address().port}`);
});
