var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var EventEmitter = require('events');
var assign = require('object-assign');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = WikiConstants.CHANGE_EVENT;

var _pagesByName = {};
var _pagesById = {};

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

  getByName: function(name) {
    if (_pagesByName.hasOwnProperty(name)) {
      return _pagesByName[name];
    } else {
      return null;
    }
  },

  get: function(id) {
    if (_pagesById.hasOwnProperty[id]) {
      return _pagesById[id];
    } else {
      return null;
    }
  }

  // Adds page data to the internal storage objects
  // (the added object is indexed by both ID and by name,
  //  if those properties are defined)
  mergeIntoStorage: function(pageData) {
    // Merge into page storage by id if possible
    if (pageData.hasOwnProperty('id')) {
      var id = pageData.id;

      // Remove the old page name entry from storage
      // if it exists.  (if applicable, will be added back later)
      // This is necessary to prevent stale page names
      // from persisting in storage (e.g. if the name is updated)
      var currentPageName = _pagesById[id] === undefined ?
          undefined : _pagesById[id].name;
      if (currentPageName !== undefined) {
        delete _pagesByName[currentPageName];
      }

      // Add the pageData to storage at the appropriate ID
      // Will overwrite if an object already exists in that location
      _pagesById[id] = pageData;
    }

    // Merge into page storage by name if possible
    if (pageData.hasOwnProperty('name')) {
      var name = pageData.name;
      _pagesByName[name] = pageData;
    }

  },

  // Removes page data from the internal storage objects
  removeFromStorage: function(pageData) {

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
    // Asynchronous requests for page data
    case ActionTypes.REQUEST_PAGE:
      var pageData = {
        name: action.pageName,
        status: WikiConstants.statusTypes.LOADING
      };
      mergeIntoStorage(pageData)

      // Mark the page as loading
      if (_pages.hasOwnProperty(action.pageName)) {
        _pages[action.pageName].status = WikiConstants.statusTypes.LOADING;
      } else {
        _pages[action.pageName] = {
          status: WikiConstants.statusTypes.LOADING
        };
      }

      // Alert all listeners that a change has occurred
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_SUCCESS:
      // Save page data to this store
      var pageData = action.data;
      pageData.loading = false;

      WikiPageStore.mergeIntoStorage(pageData);

      // Alert all listeners that a change has occurred
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_FAILURE:
      WikiPageStore.emitChange();
      break;


    // Asynchronous requests for saving pages
    case ActionTypes.SAVE_PAGE:
      _pages[action.pageId] = WikiConstants.statusTypes.SAVING;
      break;

    default:
      // do nothing
  };
});

module.exports = WikiPageStore;
