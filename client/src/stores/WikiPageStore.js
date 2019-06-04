import AppDispatcher from '../dispatcher/AppDispatcher';
import WikiConstants from '../constants/WikiConstants.js';
var _ = require('underscore');
import StoreUtils from '../utils/StoreUtils.js';
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
  clear: function() {
    _pagesById = {};
    _pagesByName = {};
  },
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

  _mergeStatusOnlyIntoOptimisticStorage: function(pageId, status, actionType) {
    // Check that the ids match up:
    // This will likely never happen, but theoretically,
    // for long callbacks, the user may have navigated to
    // a different page and updated the optimistically-stored
    // page to be a new page, in which case we don't want to
    // update the status of it based on a now-stale request
    if (pageId === _optimisticPage.id) {
      _optimisticPage.status = status;
      _optimisticPage.actionType = actionType;
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
      _optimisticPage = null;
    }
  },
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
    case ActionTypes.REQUEST_USER_FAILURE:
      WikiPageStore.clear();
      WikiPageStore.emitChange();
      break;
    case ActionTypes.LOGOUT_USER:
      WikiPageStore.clear();
      WikiPageStore.emitChange();
      break;
    case ActionTypes.SAVE_PAGE:
      const savePageData = action.pageData;
      savePageData.actionType = action.type;
      savePageData.status = 200;
      WikiPageStore._mergeIntoOptimisticStorage(savePageData);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.SAVE_PAGE_SUCCESS:
      const savePageSuccessData = action.pageData;
      savePageSuccessData.status = action.response.status;
      savePageSuccessData.actionType = action.type;
      WikiPageStore._mergeIntoStorage(savePageSuccessData);
      WikiPageStore.emitChange();
      action.onSuccess();
      break;
    case ActionTypes.REQUEST_PAGE_FAILURE:
    case ActionTypes.SAVE_PAGE_FAILURE:
      const status = action.response.status;
      WikiPageStore._mergeStatusOnlyIntoOptimisticStorage(action.pageData.id, status, action.type);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_SUCCESS:
      const requestPageData = action.response.body.data;
      requestPageData.status = action.response.status;
      requestPageData.actionType = action.type;
      WikiPageStore._mergeIntoStorage(requestPageData);
      WikiPageStore.emitChange();
      break;
    case ActionTypes.CREATE_PAGE:
      break;
    case ActionTypes.CREATE_PAGE_SUCCESS:
      const createPageData = action.response.body.data;
      createPageData.status = action.response.status;
      createPageData.actionType = action.type;
      WikiPageStore._mergeIntoStorage(createPageData);
      WikiPageStore.emitChange();
      action.onSuccess();
      break;
    case ActionTypes.CREATE_PAGE_FAILURE:
      break;
    case ActionTypes.REQUEST_PAGE_LIST_SUCCESS:
      const pages = action.response.body.data;
      _.each(pages, function(page) {
        page.status = action.response.status;
        page.actionType = action.type;
        WikiPageStore._mergeIntoStorage(page);
      });
      WikiPageStore.emitChange();
      break;
    case ActionTypes.DELETE_PAGE_SUCCESS:
      const deletePageId = action.response.body.data.id;
      WikiPageStore.removePageFromStorage(deletePageId);
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

export default WikiPageStore;
