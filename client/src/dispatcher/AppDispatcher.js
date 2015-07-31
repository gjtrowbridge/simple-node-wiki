var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var flux = new Dispatcher();

module.exports = {
  register: function(callback) {
    return flux.register(callback);
  },
  dispatch: function(type, action) {
    var info = assign({type: type}, action);
    flux.dispatch(info);
  },
  dispatchAsync: function(promise, types, action) {
    requestType = types.request;
    successType = types.success;
    failureType = types.failure;

    // Dispatch an event that we are making a request
    this.dispatch(requestType, action);

    // Dispatch an event after the request is complete
    promise.then(
      function(responseSuccess) {
        var info = assign({}, action, responseSuccess);
        this.dispatch(successType, info);
      },
      function(responseFailure) {
        var info = assign({}, action, responseFailure);
        this.dispatch(failureType, info);
      }
    );
  }
};
