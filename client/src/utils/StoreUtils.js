var shared = require('../../../shared/shared.js');
var assign = require('object-assign');

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
      mergeObjectIntoStorage: shared.decorators.addDefaultParams({
        storage: shared.constants.IS_REQUIRED,
        index: shared.constants.IS_REQUIRED,
        newDataObject: shared.constants.IS_REQUIRED,
        deleteExistingBeforeMerge: false
      }, function(params) {
        if (params.newDataObject === null ||
            typeof params.newDataObject !== 'object') {
          throw 'newDataObject must be an object!';
        }
        if (params.deleteExistingBeforeMerge) {
          delete params.storage[params.index];
        }
        var existingDataObject = params.storage[params.index] || {};
        var newDataObject = assign(existingDataObject, params.newDataObject);
        params.storage[params.index] = newDataObject;
      });
    }, spec);
  }
};

module.exports = storeUtils;
