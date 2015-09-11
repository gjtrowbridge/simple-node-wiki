var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();
var api = require('./server/api/index.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add api endpoints
app.use('/_api', api(express));

// Serve static files
app.use('/_public', express.static(__dirname + '/client/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/public/index.html')
});

// Start up app on specified port
var port = process.env.PORT || 8080;

// Start up the HTTP server
http.createServer(app).listen(port, function() {
  console.log('HTTP server listening on port:', port);
});

var httpsPort = process.env.SIMPLE_WIKI_HTTPS_PORT;
if (httpsPort) {
  // Start up the HTTPS server
  var options = {
    key: fs.readFileSync('key.pem').toString(),
    cert: fs.readFileSync('cert.pem').toString()
  };
  https.createServer(options, app).listen(httpsPort, function() {
    console.log('HTTPS server listening on port:', httpsPort);
  });
}
