// Creates and returns a router that handles all 'page' related endpoints
var createPageRouter = function(express, db) {
  var pageRouter = express.Router();

  var Page = db.Page;
  var sequelize = db.sequelize;

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
  // the wiki, given an ID or name
  pageRouter.get('/:id_or_name', function(req, res) {
    var id_or_name = req.params.id_or_name;

    var findPromise;
    // Find a page with the specified ID (if numeric)
    if (id_or_name.match(/\d+/) !== null) {
      var id = id_or_name;
      findPromise = Page.findOne({
        where: {
          id: id
        }
      });
    // Or finds a page with the specified name (if non-numeric)
    } else {
      var name = id_or_name;
      findPromise = Page.findOne({
        where: {
          name: name
        }
      });
    }
    // Return results
    findPromise.done(
      function(page) {
        if (page !== null) {
          res.status(200).json({
            data: page
          });
        } else {
          res.status(404).json({
            error: 'Page not found'
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

  // Create a new page
  pageRouter.post('/', function(req, res) {
    Page.create({
      title: req.body.title,
      text: req.body.text,
      name: req.body.name
    }).done(
      function(page) {
        res.status(201).json({
          data: page
        });
      },
      function(err) {
        res.status(500).json({
          error: err
        });
      }
    );
  });

  // Update a page (can only update with ID)
  pageRouter.put('/:id', function(req, res) {
    console.log(req.body);
    var id = req.params.id;
    Page.update({
      title: req.body.title,
      text: req.body.text,
      name: req.body.name
    }, {
      where: {
        id: id
      }
    }).done(
      function(rows_affected) {
        res.status(200).json({
          rows_affected: rows_affected
        });
      },
      function(err) {
        res.status(500).json({
          error: err
        });
      }
    );
  });

  // Delete a page
  pageRouter.delete('/:id', function(req, res) {
    res.status(500).send('Delete not yet implemented');
  });

  return pageRouter;
};

module.exports = createPageRouter;
