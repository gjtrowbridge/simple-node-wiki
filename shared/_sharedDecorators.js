var _ = require('underscore');
var sharedConstants = require('./_sharedConstants.js');
var sharedDecorators = {};

/*
  Accepts a parameterDefinition object that defines
  what properties are accepted by the function and optionally
  provides default values.

  Not providing an IS_REQUIRED value will throw an error.
  Providing additional parameters beyond those defined will
  throw an error.
*/
sharedDecorators.addDefaultParams = function(parametersDefinition, func) {
  return function(parameters) {
    if (arguments.length !== 1) {
      throw 'This function only accepts one argument'
    }
    if (typeof parameters !== 'object') {
      throw 'The only argument passed to this function should be an object!';
    }

    // Make sure all required parameters are defined
    _.each(parametersDefinition, function(value, name) {
      if (value === sharedConstants.IS_REQUIRED
          && !parameters.hasOwnProperty(name)) {
        throw 'The required parameter: ' + name + ' was not provided!';
      }
    });

    // Make sure no unexpected parameters were defined
    _.each(parameters, function(value, name) {
      if (!parametersDefinition.hasOwnProperty(name)) {
        throw 'An unexpected parameter was passed to this function!';
      }
    });

    var newParameters = {};
    _.extend(newParameters, parametersDefinition, parameters);
    return func.call(this, newParameters);
  }
};

module.exports = sharedDecorators;