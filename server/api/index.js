var createPageRouter = require('./pages/createPageRouter.js');

var createApiRouter = function(express, sequelize) {
  var apiRouter = express.Router();

  apiRouter.post('/', function(req, res) {
    res.send('Welcome to the api!');
  });

  // Add end points for handling CRUD operations for pages
  apiRouter.use('/pages', createPageRouter(express, sequelize));

  return apiRouter;
}

module.exports = createApiRouter;
