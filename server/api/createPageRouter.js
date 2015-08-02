var apiHelpers = require('./apiHelpers.js');


// Creates a page object from an incoming json request
var createPageObject = function(req) {
  return {
    title: req.body.title,
    text: req.body.text,
    name: req.body.name
  };
};

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
        apiHelpers.respondWithData(req, res, pages);
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    )
  });

  // Get a page by id
  pageRouter.get('/:id', function(req, res) {
    Page.findOne({
      where: {
        id: req.params.id
      }
    }).done(
      function(page) {
        apiHelpers.respondWithDataOrNotFound(req, res, page);
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    );
  });

  // Get a page by name
  pageRouter.get('/name/:name', function(req, res) {
    Page.findOne({
      where: {
        name: req.params.name
      }
    }).done(
      function(page) {
        apiHelpers.respondWithDataOrNotFound(req, res, page);
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    );
  });

  // Create a new page
  pageRouter.post('/', function(req, res) {
    Page.create(createPageObject(req)).done(
      function(page) {
        apiHelpers.respondWithData(req, res, page, 201);
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    );
  });

  // Find a page by id and update
  pageRouter.put('/:id', function(req, res) {
    Page.update(createPageObject(req), {
      where: {
        id: req.params.id
      }
    }).done(
      function(rows_affected) {
        apiHelpers.respondWithData(req, res, {
          rows_affected: rows_affected
        });
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    );
  });

  // // Find a page by name and update
  // pageRouter.put('/name/:name', function(req, res) {
  //   Page.update(createPageObject(req), {
  //     where: {
  //       name: req.params.name
  //     }
  //   }).done(
  //     function(rows_affected) {
  //       apiHelpers.respondWithData(req, res, {
  //         rows_affected: rows_affected
  //       });
  //     },
  //     function(err) {
  //       apiHelpers.respondWithError(req, res, err);
  //     }
  //   );
  // });

  // Delete a page
  pageRouter.delete('/:id', function(req, res) {
    res.status(500).send('Delete not yet implemented');
  });

  return pageRouter;
};

module.exports = createPageRouter;
