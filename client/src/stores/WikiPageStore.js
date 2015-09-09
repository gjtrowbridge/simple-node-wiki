var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var _ = require('underscore');
var StoreUtils = require('../utils/StoreUtils.js');
var ActionTypes = WikiConstants.ActionTypes;

var _pagesByName = {};
var _pagesById = {};
var _viewMode = true;

// If actively editing, this will be the data
// that has not yet been saved to the server
// (or at least has not yet received confirmation)
// Note: this implementation relies on the assumption
// that a given user will be editing only one page,
// which is true in the given application.
// (Will need a slight refactor if this changes)
var _optimisticPage = null;
var _nextSaveRequestId = 1;

var WikiPageStore = StoreUtils.createStore({
  getByName: function(name) {
    if (_optimisticPage !== null && _optimisticPage.name === name) {
      return _optimisticPage;
    } else if (_pagesByName.hasOwnProperty(name)) {
      return _pagesByName[name];
    } else {
      return null;
    }
  },

  get: function(id) {
    if (_optimisticPage !== null && _optimisticPage.id === id) {
      return _optimisticPage;
    } else if (_pagesById.hasOwnProperty[id]) {
      return _pagesById[id];
    } else {
      return null;
    }
  },

  removePageFromStorage: function(id) {
    var pageData = WikiPageStore.get(id);
    var currentPageName = _pagesById[id] === undefined ?
        undefined : _pagesById[id].name;
    if (currentPageName !== undefined) {
      delete _pagesByName[currentPageName];
    }
    delete _pagesById[id];
  },

  setViewMode: function(isEnabled) {
    _viewMode = isEnabled;
  },
  
  getViewMode: function() {
    return _viewMode;
  },

  // Only save to the optimistic data storage
  // so only the "actual" storage has data
  // that came directly from the server
  _mergeIntoOptimisticStorage: function(pageData) {
    pageData.saveRequestId = _nextSaveRequestId;
    _optimisticPage = pageData;
    _nextSaveRequestId++;
  },

  _mergeStatusOnlyIntoOptimisticStorage: function(pageData) {
    // Check that the ids match up:
    // This will likely never happen, but theoretically,
    // for long callbacks, the user may have navigated to
    // a different page and updated the optimistically-stored
    // page to be a new page, in which case we don't want to
    // update the status of it based on a now-stale request
    if (pageData.id === _optimisticPage.id) {
      _optimisticPage.status = pageData.status;
    }
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

    // If this page data object has the same request ID as the
    // optimistically stored page data, then we know that page
    // also now exists on the server, and no longer need the
    // "optimistic" version
    if (_optimisticPage !== null &&
        _optimisticPage.saveRequestId === pageData.saveRequestId) {
      console.log('caught up!');
      _optimisticPage = null;
    }
  },

  // // Allows continuous saving of the markdown editor text
  // // while typing because only the status of the data is
  // // overwritten (instead of overwriting, for example,
  // // the text, with stale values)
  // _mergeStatusOnlyIntoStorage: function(pageData) {
  //   if (pageData.hasOwnProperty('id')) {
  //     var id = pageData.id;
  //     // Updating in the ID dictionary will also
  //     // update in the name dictionary (since both refer to same object)
  //     _pagesById[id].status = pageData.status
  //   }
  // }
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
      break;
    case ActionTypes.SAVE_PAGE:
      var pageData = action.pageData;
      pageData.status = action.type;
      WikiPageStore._mergeIntoOptimisticStorage(pageData);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.SAVE_PAGE_SUCCESS:
      var pageData = action.pageData;
      pageData.status = action.type;
      WikiPageStore._mergeIntoStorage(pageData);
      WikiPageStore.emitChange();
      action.onSuccess();
      break;
    case ActionTypes.REQUEST_PAGE_FAILURE:
    case ActionTypes.SAVE_PAGE_FAILURE:
      var pageData = action.pageData;
      pageData.status = action.type;
      WikiPageStore._mergeStatusOnlyIntoOptimisticStorage(pageData);
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
      WikiPageStore.emitChange();
      action.onSuccess();
      break;
    case ActionTypes.CREATE_PAGE_FAILURE:
      break;
    case ActionTypes.REQUEST_PAGE_LIST_SUCCESS:
      var pages = action.data;
      _.each(pages, function(page) {
        page.status = action.type;
        WikiPageStore._mergeIntoStorage(page);
      });
      WikiPageStore.emitChange();
      break;
    case ActionTypes.DELETE_PAGE_SUCCESS:
      var id = action.pageId;
      WikiPageStore.removePageFromStorage(id);
      WikiPageStore.emitChange();
      action.onSuccess();
      break;
    case ActionTypes.SET_VIEW_MODE:
      WikiPageStore.setViewMode(action.isEnabled);
      WikiPageStore.emitChange();
      break;
    default:
      // do nothing
  };
});

module.exports = WikiPageStore;
