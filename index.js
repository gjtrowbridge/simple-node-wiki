var express = require('express');
var app = express();
var api = require('./server/api/index.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add api endpoints
app.use('/_api', api(express));

// Serve static files
app.use('/_public', express.static(__dirname + '/client/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client//public/index.html')
});

// Start up app on specified port
var port = process.env.port || 8080;
app.listen(port, function() {
  console.log('Server listening on port:', port);
});
