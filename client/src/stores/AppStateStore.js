var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var AppStateActionCreators = require('../actions/AppStateActionCreators.js');
var StoreUtils = require('../utils/StoreUtils.js');
var ActionTypes = WikiConstants.ActionTypes;

var _activeModalInnerNode = null;
var _activeNotifications = [];
var _nextNotificationId = 1;
var _searchResultsAreEnabled = true;

var AppStateStore = StoreUtils.createStore({
  activeModalInnerNode: function() {
    return _activeModalInnerNode;
  },

  showModal: function(innerNode) {
    _activeModalInnerNode = innerNode;
  },

  hideModal: function() {
    _activeModalInnerNode = null;
  },

  activeNotifications: function() {
    return _activeNotifications;
  },

  showNotification: function(text, timeout) {
    var me = this;
    var notificationId = _nextNotificationId;
    var timeoutId = null;

    // If this notification has a timer, set
    // it to remove itself when time expires
    if (timeout !== null) {
      timeoutId = setTimeout(function() {
        AppStateActionCreators.hideNotification(notificationId);
      }, timeout);
    }
    notification = {
      notificationId: notificationId,
      timeoutId: timeoutId,
      text: text
    };
    _activeNotifications.push(notification);
    _nextNotificationId++;
  },

  hideNotification: function(notificationId) {
    var notification = _activeNotifications.filter(function(n) {
      return n.notificationId === notificationId;
    })[0];

    // Clear the timer for this notification
    if (notification.timeoutId !== null) {
      clearTimeout(notification.timeoutId);
    }

    // Remove this notification from the list
    _activeNotifications = _activeNotifications.filter(function(n) {
      return n.notificationId !== notificationId;
    });
  },

  toggleSearchResults: function(newValue) {
    _searchResultsAreEnabled = newValue;
  },

  searchResultsAreEnabled: function() {
    return _searchResultsAreEnabled;
  }
});

// All actions go through the dispatcher, and the dispatcher
// runs all registered callbacks for all actions
// So, if there is an action that goes through the dispatcher
// that we care about for Wiki Pages, we can add any necessary
// handling here (usually, state updates here followed by emitting
// a change event)
AppStateStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.SHOW_MODAL:
      AppStateStore.showModal(action.innerNode);
      AppStateStore.emitChange();
      break;
    case ActionTypes.HIDE_MODAL:
      AppStateStore.hideModal();
      AppStateStore.emitChange();
      break;
    case ActionTypes.SHOW_NOTIFICATION:
      AppStateStore.showNotification(action.text, action.timeout);
      AppStateStore.emitChange();
      break;
    case ActionTypes.HIDE_NOTIFICATION:
      AppStateStore.hideNotification(action.notificationId);
      AppStateStore.emitChange();
      break;
    case ActionTypes.CREATE_PAGE_SUCCESS:
      var newlyCreatedPage = action.data;
      AppStateStore.hideModal();
      AppStateStore.showNotification(
        'You successfully created a new page: "' + newlyCreatedPage.title + '"', 10000)
      AppStateStore.emitChange();
      break;
    case ActionTypes.TOGGLE_SEARCH_RESULTS:
      AppStateStore.toggleSearchResults(action.enableSearchResults);
      AppStateStore.emitChange();
      break;
    default:
      // do nothing
  };
});

module.exports = AppStateStore;
