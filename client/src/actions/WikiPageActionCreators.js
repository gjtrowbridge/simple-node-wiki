var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiUtils = require('../utils/WikiUtils.js');
var WikiConstants = require('../constants/WikiConstants.js');

var WikiPageActionCreators = {
  savePage: function() {

  },
  requestPage: function(url) {
    var pagePromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'GET', null);
    return AppDispatcher.dispatchAsync(pagePromise, {
      request: WikiConstants.REQUEST_PAGE,
      success: WikiConstants.REQUEST_PAGE_SUCCESS,
      failure: WikiConstants.REQUEST_PAGE_FAILURE
    }, {});
  }
};

module.exports = WikiPageActionCreators;