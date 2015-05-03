var pagesHandler = require('./pages/addPageEndpoints.js');

var addApiEndpoints = function(express, sequelize) {
  var api = express.Router();

  api.post('/', function(req, res) {
    res.send('Welcome to the api!');
  });

  api.use('/pages', pagesHandler)

  return api;
}

module.exports = addApiEndpoints;
