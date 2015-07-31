var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var EventEmitter = require('events');
var assign = require('object-assign');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = WikiConstants.CHANGE_EVENT;

var WikiPageStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(pageName) {
    return {
      id: 1,
      name: 'My url is: ' + pageName,
      text: 'This is text for page with url: ' + pageName
    };
  }
});

// All actions go through the dispatcher, and the dispatcher
// runs all registered callbacks for all actions
// So, if there is an action that goes through the dispatcher
// that we care about for Wiki Pages, we can add any necessary
// handling here (usually, state updates here followed by emitting
// a change event)
WikiPageStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SAVE_PAGE:
      // add something here
      break;
    default:
      // do nothing
  };
});

module.exports = WikiPageStore;
