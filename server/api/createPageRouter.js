// Creates and returns a router that handles all 'page' related endpoints
var createPageRouter = function(express, databaseInfo) {
  var pageRouter = express.Router();

  var Page = databaseInfo.models.Page;
  var sequelize = databaseInfo.sequelize;

  // This will return the data for all pages
  // currently defined in the wiki
  pageRouter.get('/', function(req, res) {
    Page.findAll()
    .done(
      function(pages) {
        res.status(200).json({
          data: pages
        });
      },
      function(err) {
        res.status(500).json({
          error: err
        });
      }
    )
  });

  // This will return the data for single page of
  // the wiki
  pageRouter.get('/:name', function(req, res) {
    var name = req.params.name;
    Page.findOne({
      where: {
        name: name
      }
    }).done(
      function(page) {
        if (page !== null) {
          res.status(200).json({
            data: page
          })
        } else {
          res.status(404).json({
            error: 'No page found with name "' + name + '"'
          });
        }
      },
      function(err) {
        res.status(500).json({
          error: err
        });
      }
    );
  });

  return pageRouter;
};

module.exports = createPageRouter;
