const https = require('https');
const http = require('http');
const fs = require('fs');

const app = require('./app.js');

// Start up app on specified port
const port = process.env.PORT || 8090;

// Start up the HTTP server
http.createServer(app).listen(port, function() {
  console.log('HTTP server listening on port:', port);
});

const httpsPort = process.env.SIMPLE_WIKI_HTTPS_PORT;
if (httpsPort) {
  // Start up the HTTPS server
  const options = {
    key: fs.readFileSync('key.pem').toString(),
    cert: fs.readFileSync('cert.pem').toString()
  };
  https.createServer(options, app).listen(httpsPort, function() {
    console.log('HTTPS server listening on port:', httpsPort);
  });
}
