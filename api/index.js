
var addApiEndpoints = function(express) {
  var api = express.Router();

  api.get('/', function(req, res) {
    res.send('Welcome to the api!');
  });

  return api;
}

module.exports = addApiEndpoints;
