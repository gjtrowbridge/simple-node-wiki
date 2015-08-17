var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiConstants = require('../constants/WikiConstants.js');

var ModalActionCreators = {
  showModal: function(action) {
    return AppDispatcher.dispatch(WikiConstants.SHOW_MODAL, action);
  },
  // 
  hideModal: function() {
    return AppDispatcher.dispatch(WikiConstants.HIDE_MODAL, action);
  }
};

module.exports = ModalActionCreators;
