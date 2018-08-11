var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var app = express();
var api = require('./server/api/index.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add auth endpoints
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: 'https://simple-node-wiki.herokuapp.com/auth/google/callback',
  scope: ['email'],
}, function(accessToken, refreshToken, profile, cb) {
  console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
  return cb(null, profile);
}));

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:', req.user);
    res.json(req.user);
  }
);

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
