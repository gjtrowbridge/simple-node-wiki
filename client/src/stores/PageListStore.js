var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var EventEmitter = require('events');
var assign = require('object-assign');
var _ = require('underscore');
var WikiPageStore = require('./WikiPageStore.js');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;

var _pageLists = {};

var PageListStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getPageList: function(index) {
    return _pageLists[index];
  },

  storePageList: function(pageList, index) {
    _pageLists[index] = pageList;
  }
});

PageListStore.dispatchToken = AppDispatcher.register(function(action) {
  AppDispatcher.waitFor([WikiPageStore.dispatchToken]);
  console.log('page list store action', action.type);
  switch (action.type) {
    case ActionTypes.REQUEST_PAGE_LIST_SUCCESS:
      var pageList = action.data;
      PageListStore.storePageList(pageList, action.pageListType);
      PageListStore.emitChange();
    default:
      // do nothing
  };
});

module.exports = PageListStore;
