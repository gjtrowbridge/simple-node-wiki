var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var EventEmitter = require('events');
var assign = require('object-assign');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = WikiConstants.CHANGE_EVENT;

var _pages = {};

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
    console.log('get', _pages);
    if (_pages.hasOwnProperty(pageName)) {
      return _pages[pageName];
    } else {
      return {};
    }
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
    case ActionTypes.REQUEST_PAGE:
      // Mark the page as loading
      if (_pages.hasOwnProperty(action.pageName)) {
        _pages[action.pageName].loading = true;
      } else {
        _pages[action.pageName] = { loading: true };
      }

      // Alert all listeners that a change has occurred
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_SUCCESS:
      // Save page data to this store
      var pageData = action.data;
      pageData.loading = false;
      _pages[action.pageName] = pageData;

      // Alert all listeners that a change has occurred
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_FAILURE:
      WikiPageStore.emitChange();
      break;
    default:
      // do nothing
  };
});

module.exports = WikiPageStore;
