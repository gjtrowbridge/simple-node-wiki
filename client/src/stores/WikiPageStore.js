var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var EventEmitter = require('events');
var assign = require('object-assign');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;

var _pagesByName = {};
var _pagesById = {};
// Stores a recently created page
// that has not yet been navigated to
var newlyCreatedPage = null;

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
  },

  newlyCreatedPage: function() {
    return newlyCreatedPage;
  },

  _clearNewlyCreatedPage: function() {
    newlyCreatedPage = null;
  },

  // Adds page data to the internal storage objects
  // (the added object is indexed by both ID and by name,
  //  if those properties are defined)
  _mergeIntoStorage: function(pageData) {
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

  // Allows continuous saving of the markdown editor text
  // while typing because only the status of the data is
  // overwritten (instead of overwriting, for example,
  // the text, with stale values)
  _mergeStatusOnlyIntoStorage: function(pageData) {
    if (pageData.hasOwnProperty('id')) {
      var id = pageData.id;
      // Updating in the ID dictionary will also
      // update in the name dictionary (since both refer to same object)
      _pagesById[id].status = pageData.status
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
    case ActionTypes.SAVE_PAGE:
    case ActionTypes.REQUEST_PAGE:
      var pageData = action.pageData;
      pageData.status = action.type;
      WikiPageStore._mergeIntoStorage(pageData);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_FAILURE:
    case ActionTypes.SAVE_PAGE_SUCCESS:
    case ActionTypes.SAVE_PAGE_FAILURE:
      var pageData = action.pageData;
      pageData.status = action.type;
      WikiPageStore._mergeStatusOnlyIntoStorage(pageData);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_SUCCESS:
      var pageData = action.data;
      pageData.status = action.type;
      WikiPageStore._mergeIntoStorage(pageData);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.CREATE_PAGE:
      break;
    case ActionTypes.CREATE_PAGE_SUCCESS:
      var pageData = action.data;
      pageData.status = action.type;
      WikiPageStore._mergeIntoStorage(pageData);
      newlyCreatedPage = pageData;
      WikiPageStore.emitChange();
      WikiPageStore._clearNewlyCreatedPage();
      WikiPageStore.emitChange();
      break;
    case ActionTypes.CREATE_PAGE_FAILURE:
      break;
    default:
      // do nothing
  };
});

module.exports = WikiPageStore;
