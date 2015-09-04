var shared = require('../../shared/shared.js');

var apiHelpers = {
  respondWithData: function(req, res, data, status) {
    status = status || 200;
    res.status(status).json({
      data: data
    });
  },
  respondWithDataOrNotFound: function(req, res, data) {
    if (data !== null) {
      apiHelpers.respondWithData(req, res, data, 200);
    } else {
      apiHelpers.respondWithError(req, res, 'Resource not found', 404);
    }
  },
  respondWithError: function(req, res, err, status) {
    status = status || 500;
    res.status(status).json({
      error: err
    });
  },
  convertToIntWithDefault: shared.decorators.addDefaultParams({
    valueToConvert: shared.constants.IS_REQUIRED,
    defaultValue: shared.constants.IS_REQUIRED,
    minimum: undefined,
    maximum: undefined
  }, function(params) {
    var result = isNaN(params.valueToConvert * 1) ?
        params.defaultValue : params.valueToConvert * 1;
    if (params.minimum !== undefined) {
      result = Math.max(params.minimum, result);
    }
    if (params.maximum !== undefined) {
      result = Math.min(params.maximum, result);
    }
    return result;
  })
};

module.exports = apiHelpers;
