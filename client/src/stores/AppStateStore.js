var AppDispatcher = require('../dispatcher/AppDispatcher');
var WikiConstants = require('../constants/WikiConstants.js');
var EventEmitter = require('events');
var assign = require('object-assign');
var AppStateActionCreators = require('../actions/AppStateActionCreators.js');

var ActionTypes = WikiConstants.ActionTypes;
var CHANGE_EVENT = ActionTypes.CHANGE_EVENT;

var activeModalInnerNode = null;
var activeNotifications = [];
var nextNotificationId = 1;

var AppStateStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  activeModalInnerNode: function() {
    return activeModalInnerNode;
  },

  showModal: function(innerNode) {
    activeModalInnerNode = innerNode;
  },

  hideModal: function() {
    activeModalInnerNode = null;
  },

  activeNotifications: function() {
    return activeNotifications;
  },

  showNotification: function(text, timeout) {
    var me = this;
    var notificationId = nextNotificationId;
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
    activeNotifications.push(notification);
    nextNotificationId++;
  },

  hideNotification: function(notificationId) {
    var notification = activeNotifications.filter(function(n) {
      return n.notificationId === notificationId;
    })[0];

    // Clear the timer for this notification
    if (notification.timeoutId !== null) {
      clearTimeout(notification.timeoutId);
    }

    // Remove this notification from the list
    activeNotifications = activeNotifications.filter(function(n) {
      return n.notificationId !== notificationId;
    });
  }
});

// All actions go through the dispatcher, and the dispatcher
// runs all registered callbacks for all actions
// So, if there is an action that goes through the dispatcher
// that we care about for Wiki Pages, we can add any necessary
// handling here (usually, state updates here followed by emitting
// a change event)
AppStateStore.dispatchToken = AppDispatcher.register(function(action) {
  console.log('ACTION!', action)
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
      AppStateStore.showNotification(
        'You successfully created a new page: "' + newlyCreatedPage.title + '"', 10000)
      AppStateStore.emitChange();
    default:
      // do nothing
  };
});

module.exports = AppStateStore;
