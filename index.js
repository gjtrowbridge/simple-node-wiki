var express = require('express');
var app = express();

var port = process.env.port || 8080;

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('Server listening on port:', port);
});
