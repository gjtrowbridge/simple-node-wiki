var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var databaseInfo = require('../database/setupDatabase.js')
var createPageRouter = require('./createPageRouter.js');

// This router is the entry point for all API endpoints
var createApiRouter = function(express) {
  var apiRouter = express.Router().use(bodyParser.json());

  apiRouter.post('/', function(req, res) {
    console.log(req.body);
    res.send('Welcome to the api!');
  });

  // Add end points for handling CRUD operations for pages
  apiRouter.use('/pages', createPageRouter(express, databaseInfo));

  return apiRouter;
};

module.exports = createApiRouter;
