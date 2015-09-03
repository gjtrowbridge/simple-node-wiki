var _ = require('underscore');
var sharedConstants = require('./sharedConstants.js');
var sharedDecorators = {};

/*
  Accepts a parameterDefinition object that defines
  what properties are accepted by the function and optionally
  provides default values.

  Not providing an IS_REQUIRED value will throw an error.
  Providing additional parameters beyond those defined will
  throw an error.
*/
sharedDecorators.addDefaultParams = function(parameterDefinition, func) {
  return function(parameters) {
    if (arguments.length !== 1) {
      throw 'This function only accepts one argument'
    }
    if (typeof parameters !== 'object') {
      throw 'The only argument passed to this function should be an object!';
    }

    // Make sure all required parameters are defined
    for (key in parameterDefinition) {
      if (parameterDefinition[key] === sharedConstants.IS_REQUIRED
          && !parameters.hasOwnProperty(key)) {
        throw 'The required parameter: ' + key + ' was not provided!';
      }
    }

    var newParameters = {};

    return func(parameters);

  }
};

module.exports = sharedDecorators;