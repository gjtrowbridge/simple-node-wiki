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

    if (!(requestType && successType && failureType)) {
      throw "Request, success, and failure types must all be defined!";
    }

    // Tell dispatcher that we are making a request
    this.dispatch(requestType, action);

    // Tell dispatcher when the request is complete
    promise.then(
      function(responseSuccess) {
        var info = assign({}, action, responseSuccess);
        this.dispatch(successType, info);
      }.bind(this),
      function(responseFailure) {
        var info = assign({}, action, responseFailure);
        this.dispatch(failureType, info);
      }.bind(this)
    );
  }
};
