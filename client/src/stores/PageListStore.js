var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var WikiPageStore = require('./WikiPageStore.js');
var StoreUtils = require('../utils/StoreUtils.js');
var ActionTypes = WikiConstants.ActionTypes;
var shared = require('../../../shared/shared.js');

var _pageLists = {};

var PageListStore = StoreUtils.createStore({
  getPageList: function(index) {
    return _pageLists[index];
  },

  storePageList: function(pageList, index) {
    _pageLists[index] = pageList;
  },

  removePageList: function(index) {
    delete _pageLists[index];
  }
});

PageListStore.dispatchToken = AppDispatcher.register(function(action) {
  AppDispatcher.waitFor([WikiPageStore.dispatchToken]);
  switch (action.type) {
    case ActionTypes.REQUEST_PAGE_LIST_SUCCESS:
      var pageList = action.data;
      PageListStore.storePageList(pageList, action.pageListType);
      PageListStore.emitChange();
      break;
    case ActionTypes.CLEAR_SEARCH:
      PageListStore.removePageList(shared.constants.SEARCH);
      PageListStore.emitChange();
      break;
    default:
      // do nothing
  };
});

module.exports = PageListStore;
