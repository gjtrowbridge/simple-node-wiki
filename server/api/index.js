var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var createPageRouter = require('./createPageRouter.js');
var db = require('../database/models/index.js');

// This router is the entry point for all API endpoints
var createApiRouter = function(express) {
  var apiRouter = express.Router().use(bodyParser.json());

  apiRouter.post('/', function(req, res) {
    console.log(req.body);
    res.send('Welcome to the api!');
  });

  // Add end points for handling CRUD operations for pages
  apiRouter.use('/pages', createPageRouter(express, db));

  return apiRouter;
};

module.exports = createApiRouter;
