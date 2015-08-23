var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiConstants = require('../constants/WikiConstants.js');

var AppStateActionCreators = {
  // innerNode should be any render-able item
  showModal: function(innerNode) {
    return AppDispatcher.dispatch(WikiConstants.ActionTypes.SHOW_MODAL, {
      innerNode: innerNode
    });
  },
  
  // Hides the existing modal (if any)
  hideModal: function() {
    return AppDispatcher.dispatch(WikiConstants.ActionTypes.HIDE_MODAL, {});
  },

  showNotification: function(text, timeout) {
    return AppDispatcher.dispatch(WikiConstants.ActionTypes.SHOW_NOTIFICATION, {
      text: text,
      timeout: timeout
    });
  },

  hideNotification: function(notificationId) {
    return AppDispatcher.dispatch(WikiConstants.ActionTypes.HIDE_NOTIFICATION, {
      notificationId: notificationId
    });
  }
};

module.exports = AppStateActionCreators;
