const express = require('express');

const app = express();
const api = require('./server/api/index');
const auth = require('./server/auth/index');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Add auth endpoints
const authData = auth(
  process.env.WIKI_APP_URL + '/_auth',
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.IS_PRODUCTION,
  process.env.SECRET_KEY_JWT || 'notverysecretdefaultkey'
);
app.use('/_auth', authData.authRouter);

// Add api endpoints
app.use('/_api', api(express, authData.addUserToReqMiddleware));

// Serve static files
app.use('/_public', express.static(__dirname + '/client/public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/public/index.html')
});

module.exports = app;
