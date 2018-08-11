var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();
var api = require('./server/api/index');
var auth = require('./server/auth/index');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add auth endpoints
var authData = auth(
  process.env.WIKI_APP_URL + '/_auth',
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.IS_PRODUCTION,
  process.env.SECRET_KEY_JWT || 'notverysecretdefaultkey'
);
app.use('/_auth', authData.authRouter);

// Add api endpoints
app.use('/_api', api(express));

// Serve static files
app.use('/_public', express.static(__dirname + '/client/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/public/index.html')
});

// Start up app on specified port
var port = process.env.PORT || 8090;

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
