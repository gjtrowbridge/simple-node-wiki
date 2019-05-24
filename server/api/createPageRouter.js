var apiHelpers = require('./apiHelpers.js');
var shared = require('../../shared/shared.js');
// TODO: add validation to these endpoints
// ie. names should follow a certain regex

// Creates a page object from an incoming json request
var createPageObject = function(req) {
  return {
    title: req.body.title,
    text: req.body.text,
    name: req.body.name,
    userId: req.user.id,
  };
};

// Creates and returns a router that handles all 'page' related endpoints
var createPageRouter = function(express, db, addUserToReqMiddleware) {
  var pageRouter = express.Router();

  const Page = db.models.Page;
  var sequelize = db.sequelize;

  // This will return the data for all pages
  // currently defined in the wiki
  pageRouter.get('/', addUserToReqMiddleware, function(req, res) {
    var limit = apiHelpers.convertToIntWithDefault({
      valueToConvert: req.query.limit,
      defaultValue: 10,
      minimum: 1,
      maximum: 10
    });
    var offset = apiHelpers.convertToIntWithDefault({
      valueToConvert: req.query.offset,
      defaultValue: 0,
      minimum: 0
    });

    var listType = req.query.listType;
    var order;
    if (listType === shared.constants.ORDER_BY_CREATED) {
      order = [['createdAt', 'DESC']];
    } else if (listType === shared.constants.ORDER_BY_MODIFIED) {
      order = [['updatedAt', 'DESC']];
    } else {
      order = [];
    }

    Page.findAll({
      limit: limit,
      offset: offset,
      order: order,
      where: {
        userId: req.user.id,
      },
    })
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
  pageRouter.get('/:id', addUserToReqMiddleware, function(req, res) {
    Page.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
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
  pageRouter.get('/name/:name', addUserToReqMiddleware, function(req, res) {
    Page.findOne({
      where: {
        name: req.params.name,
        userId: req.user.id,
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
  pageRouter.post('/', addUserToReqMiddleware, async function(req, res) {
    const pageData = createPageObject(req);
    const page = await Page.findOne({
      where: {
        name: pageData.name
      },
    });
    if (page === null) {
      Page.create(createPageObject(req)).done(
        function(page) {
          apiHelpers.respondWithData(req, res, page, 201);
        },
        function(err) {
          apiHelpers.respondWithError(req, res, err);
        }
      );
    } else {
      apiHelpers.respondWithError(
        req,
        res,
        `page with name "${pageData.name}" already exists`,
        400,
      );
    }
  });

  // Find a page by id and update
  pageRouter.put('/:id', addUserToReqMiddleware, function(req, res) {
    Page.update(createPageObject(req), {
      where: {
        id: req.params.id,
        userId: req.user.id,
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

  // Delete a page
  pageRouter.delete('/:id', addUserToReqMiddleware, function(req, res) {
    Page.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      }
    }).then(function(page) {
      return page.destroy();
    }).done(
      function(page) {
        apiHelpers.respondWithDataOrNotFound(req, res, page);
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    );
  });

  // Search by title
  pageRouter.get('/search/:keyword', addUserToReqMiddleware, function(req, res) {
    var limit = apiHelpers.convertToIntWithDefault({
      valueToConvert: req.query.limit,
      defaultValue: 10,
      minimum: 1,
      maximum: 20
    });
    var offset = apiHelpers.convertToIntWithDefault({
      valueToConvert: req.query.offset,
      defaultValue: 0,
      minimum: 0,
    });
    var likeString = '%' + req.params.keyword + '%';
    Page.findAll({
      limit: limit,
      offset: offset,
      where: {
        userId: req.user.id,
        '$or': {
          title: {
            $like: '%' + req.params.keyword + '%'
          },
          text: {
            $like: '%' + req.params.keyword + '%'
          }
        }
      }
    }).done(
      function(pages) {
        apiHelpers.respondWithDataOrNotFound(req, res, pages);
      },
      function(err) {
        apiHelpers.respondWithError(req, res, err);
      }
    );
  });

  return pageRouter;
};

module.exports = createPageRouter;
