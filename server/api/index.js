var bodyParser = require('body-parser');
var createPageRouter = require('./createPageRouter.js');
var db = require('../database/models/index.js');


// This router is the entry point for all API endpoints
var createApiRouter = function(express) {
  var apiRouter = express.Router().use(bodyParser.json());

  // Allow CORS
  apiRouter.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
  apiRouter.post('/', function(req, res) {
    res.send('Welcome to the api!');
  });

  // Add end points for handling CRUD operations for pages
  apiRouter.use('/pages', createPageRouter(express, db));

  return apiRouter;
};

module.exports = createApiRouter;
