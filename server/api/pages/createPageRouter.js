var createPageRouter = function(express, sequelize) {
  var pageRouter = express.Router();

  pageRouter.get('/', function(req, res) {
    res.send('This will return all the pages!');
  });

  // This will return a single page
  pageRouter.get('/:name', function(req, res) {
    res.send('This will return the page named ' + req.params.name);
  });

  return pageRouter;
};

module.exports = createPageRouter;
