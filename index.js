var express = require('express');
var app = express();
var api = require('./api');

// Add api endpoints
app.use('/api', api(express));

// Serve static files
app.use(express.static(__dirname + '/public'));

// Start up app on specified port
var port = process.env.port || 8080;
app.listen(port, function() {
  console.log('Server listening on port:', port);
});
