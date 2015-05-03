var Sequelize = require('sequelize');
var createPageRouter = require('./createPageRouter.js');

var databaseInfo = require('../database/setupDatabase.js')

// This router is the entry point for all API endpoints
var createApiRouter = function(express) {
  var apiRouter = express.Router();

  apiRouter.post('/', function(req, res) {
    res.send('Welcome to the api!');
  });

  // Add end points for handling CRUD operations for pages
  apiRouter.use('/pages', createPageRouter(express, databaseInfo));

  return apiRouter;
};

module.exports = createApiRouter;
