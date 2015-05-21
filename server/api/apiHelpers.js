
var apiHelpers = {
  respondWithData: function(req, res, data, status) {
    status = status || 200;
    res.status(status).json({
      data: data
    });
  },
  respondWithDataOrNotFound: function(req, res, page) {
    if (page !== null) {
      apiHelpers.respondWithData(req, res, page, 200);
    } else {
      apiHelpers.respondWithError(req, res, 'Resource not found', 404);
    }
  },
  respondWithError: function(req, res, err, status) {
    status = status || 500;
    res.status(status).json({
      error: err
    });
  }
};

module.exports = apiHelpers;
