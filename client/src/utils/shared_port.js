const keyMirror = require('keymirror');
const _ = require('underscore');

const constants = keyMirror({
  IS_REQUIRED: true,
  ORDER_BY_MODIFIED: true,
  ORDER_BY_CREATED: true,
  SEARCH: true
});
const decorators = {};

decorators.addDefaultParams = function(parametersDefinition, func) {
  return function(parameters) {
    if (arguments.length !== 1) {
      throw 'This function only accepts one argument'
    }
    if (typeof parameters !== 'object') {
      throw 'The only argument passed to this function should be an object!';
    }

    // Make sure all required parameters are defined
    _.each(parametersDefinition, function(value, name) {
      if (value === constants.IS_REQUIRED
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

const shared = {
  constants,
  decorators,
};

export { constants, decorators };
export default shared;
