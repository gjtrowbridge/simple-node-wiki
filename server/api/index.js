var bodyParser = require('body-parser');
var createPageRouter = require('./createPageRouter.js');
var db = require('../database/models/index.js');


// This router is the entry point for all API endpoints
var createApiRouter = function(express, addUserToReqMiddleware) {
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

  apiRouter.get('/user', addUserToReqMiddleware, function(req, res) {
    res.json({
      user: {
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      }
    });
  });

  // Add end points for handling CRUD operations for pages
  apiRouter.use('/pages', createPageRouter(express, db, addUserToReqMiddleware));

  return apiRouter;
};

module.exports = createApiRouter;
