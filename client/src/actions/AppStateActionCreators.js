var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiConstants = require('../constants/WikiConstants.js');

var AppStateActionCreators = {
  showModal: function(innerComponent) {
    return AppDispatcher.dispatch(WikiConstants.SHOW_MODAL, {
      innerComponent: innerComponent
    });
  },
  
  hideModal: function() {
    return AppDispatcher.dispatch(WikiConstants.HIDE_MODAL, {});
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
