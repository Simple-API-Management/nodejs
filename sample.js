var simpleAPIManagement = require('./');
const sampleRoute = require("./sampleRoute");
var express = require('express');

var options = {
  apiKey: '21CZ9EY-ZX8MZ49-HZ6D96X-A299C73',
  rateLimits: true, // default
  metrics: true, // default
  // identifier can be used to apply rate limits for users 
  identifier: function (req, res) {
    if (req.user) {
      return req.user.id;
    }
    return undefined;
  },
};

var app = express()
app.use(simpleAPIManagement(options));


app.use("/sample", sampleRoute);



app.get('/', function (req, res) {
  res.json({ a: 'hello' });
});

app.get('/abc', function (req, res) {
  res.json({ abc: 'another hello' });
});

app.get('/billing/:id', function (req, res) {
  res.json({ abc: 'another with path variable' });
});


app.listen(3003, function () {
  console.log('Example app listening on port 3003');
});


