var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
import shared from 'Src/utils/shared_port.js';
var flux = new Dispatcher();

export default {
  waitFor: function(ids) {
    return flux.waitFor(ids);
  },
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
    var requestType = params.types.request;
    var successType = params.types.success;
    var failureType = params.types.failure;

    if (!(requestType && successType && failureType)) {
      throw "Request, success, and failure types must all be defined!";
    }

    // Tell dispatcher that we are making a request
    this.dispatch(requestType, params.action);

    // Tell dispatcher when the request is complete
    params.promise.then(
      function(responseSuccess) {
        var responseAction = params.transformResponseSuccess(
            responseSuccess, params.action);
        this.dispatch(successType, responseAction);
      }.bind(this),
      function(responseFailure) {
        var responseAction = params.transformResponseFailure(
            responseFailure, params.action);
        this.dispatch(failureType, responseAction);
      }.bind(this)
    );
  })
};
