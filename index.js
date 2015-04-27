var express = require('express');
var app = express();
var api = require('./api');

// Add api endpoints
app.use('/__api', api(express));

// Serve static files
app.use('/__public', express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

// Start up app on specified port
var port = process.env.port || 8080;
app.listen(port, function() {
  console.log('Server listening on port:', port);
});
