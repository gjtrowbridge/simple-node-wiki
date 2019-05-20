import AppDispatcher from '../dispatcher/AppDispatcher';
import WikiConstants from '../constants/WikiConstants.js';
import AppStateActionCreators from '../actions/AppStateActionCreators.js';
import StoreUtils from '../utils/StoreUtils.js';
var ActionTypes = WikiConstants.ActionTypes;
import { transitionTo } from 'Src/utils/HistoryContainer';


var _activeModalInnerNode = null;
var _activeNotifications = [];
var _nextNotificationId = 1;
var _searchResultsAreEnabled = true;
var _activeUser = null;

var AppStateStore = StoreUtils.createStore({
  activeModalInnerNode: function() {
    return _activeModalInnerNode;
  },

  activeUser: function() {
    return _activeUser;
  },

  setActiveUser: function(user) {
    _activeUser = user;
    if (user === null) {
      localStorage.removeItem('jwt');
    }
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
    if (timeout !== null && timeout !== undefined) {
      timeoutId = setTimeout(function() {
        AppStateActionCreators.hideNotification(notificationId);
      }, timeout);
    }
    var notification = {
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
  console.log('Receiving action', action);
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
        'You successfully created a new page: "' + newlyCreatedPage.title + '"', 10000);
      AppStateStore.emitChange();
      break;
    case ActionTypes.DELETE_PAGE_SUCCESS:
      AppStateStore.showNotification(
        'You successfully deleted page: "' + action.pageTitle + '"', 10000);
      AppStateStore.emitChange();
      break;
    case ActionTypes.SAVE_PAGE:
      AppStateStore.hideModal();
      AppStateStore.emitChange();
      break;
    case ActionTypes.TOGGLE_SEARCH_RESULTS:
      AppStateStore.toggleSearchResults(action.enableSearchResults);
      AppStateStore.emitChange();
      break;
    case ActionTypes.PAGE_TRANSITION:
      AppStateStore.hideModal();
      AppStateStore.toggleSearchResults(false);
      AppStateStore.emitChange();
      break;
    case ActionTypes.LOGOUT_USER:
      var user = AppStateStore.activeUser();
      AppStateStore.setActiveUser(null);
      AppStateStore.showNotification(user.email + ' was logged out.');
      AppStateStore.emitChange();
      break;
    case ActionTypes.REQUEST_USER_SUCCESS:
      AppStateStore.setActiveUser(action.user);
      AppStateStore.showNotification('You are logged in as ' + action.user.email, 10000);
      AppStateStore.emitChange();
      break;
    case ActionTypes.REQUEST_USER_FAILURE:
      AppStateStore.setActiveUser(null);
      AppStateStore.showNotification('You are not logged in. Please log in to see your wiki pages.', null);
      AppStateStore.emitChange();
      break;
    case ActionTypes.REQUEST_PAGE_FAILURE:
      if (action.statusCode === 404) {
        AppStateStore.showNotification(
          'A page with url: "' + action.pageData.name + '" does not exist!', 10000);
      } else {
        AppStateStore.showNotification(
          'Error requesting page with url: "' + action.pageData.name + '"', 10000);
      }
      AppStateStore.emitChange();
      transitionTo('');
      break;
    default:
      // do nothing
  };
});

export default AppStateStore;
