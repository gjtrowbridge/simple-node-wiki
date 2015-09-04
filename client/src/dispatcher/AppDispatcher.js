var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var shared = require('../../../shared/shared.js');
var flux = new Dispatcher();

module.exports = {
  register: function(callback) {
    return flux.register(callback);
  },
  dispatch: function(type, action) {
    var info = assign({type: type}, action);
    flux.dispatch(info);
  },
  dispatchAsync: shared.decorators.addDefaultParams({
    promise: shared.constants.IS_REQUIRED,
    types: shared.constants.IS_REQUIRED,
    action: shared.constants.IS_REQUIRED,
    // Used to convert the result of the API call to a
    // compatible front-end format.  Simply assigns
    // to the existing action object by default
    transformResponseSuccess: function(responseSuccess, action) {
      return assign({}, action, responseSuccess);
    },
    transformResponseFailure: function(responseFailure, action) {
      return assign({}, action, responseFailure);
    }
  }, function(params) {
    requestType = params.types.request;
    successType = params.types.success;
    failureType = params.types.failure;

    if (!(requestType && successType && failureType)) {
      throw "Request, success, and failure types must all be defined!";
    }

    // Tell dispatcher that we are making a request
    this.dispatch(requestType, params.action);

    // Tell dispatcher when the request is complete
    params.promise.then(
      function(responseSuccess) {
        var responseAction =
            params.transformResponseSuccess(responseSuccess, action);
        this.dispatch(successType, responseAction);
      }.bind(this),
      function(responseFailure) {
        var responseAction =
            params.transformResponseFailure(responseSuccess, action);
        this.dispatch(failureType, responseAction);
      }.bind(this)
    );
  })
};
