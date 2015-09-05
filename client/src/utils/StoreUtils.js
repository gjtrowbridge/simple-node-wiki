var shared = require('../../../shared/shared.js');
var assign = require('object-assign');
var ActionTypes = require('../constants/WikiConstants.js').ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;
var EventEmitter = require('events');

var storeUtils = {
  createStore: function(spec) {
    return assign({}, EventEmitter.prototype, {
      emitChange: function() {
        this.emit(CHANGE_EVENT);
      },
      addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
      },
      removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
      },
      mergeObjectIntoHash: shared.decorators.addDefaultParams({
        hash: shared.constants.IS_REQUIRED,
        index: shared.constants.IS_REQUIRED,
        newDataObject: shared.constants.IS_REQUIRED,
        deleteExistingBeforeMerge: false
      }, function(params) {
        if (params.newDataObject === null ||
            typeof params.newDataObject !== 'object') {
          throw 'newDataObject must be an object!';
        }
        if (params.deleteExistingBeforeMerge) {
          delete params.hash[params.index];
        }
        var existingDataObject = params.hash[params.index] || {};
        var newDataObject = assign(existingDataObject, params.newDataObject);
        params.hash[params.index] = newDataObject;
      })
    }, spec);
  }
};

module.exports = storeUtils;
