var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiUtils = require('../utils/WikiUtils.js');
var WikiConstants = require('../constants/WikiConstants.js');

var baseUrl = "http://localhost:8080/_api/pages/name/";

var WikiPageActionCreators = {
  savePage: function(pageName, pageData) {
    var url = baseUrl + pageName;
    var savePromise = WikiUtils.requestViaHttpAndReturnPromise(
      url, 'PUT', pageData);
    return AppDispatcher.dispatchAsync(savePromise, {
      request: WikiConstants.ActionTypes.SAVE_PAGE,
      success: WikiConstants.ActionTypes.SAVE_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.SAVE_PAGE_FAILURE
    }, { pageName: pageName });
  },
  requestPage: function(pageName) {
    var url = baseUrl + pageName;
    var pagePromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'GET', null);
    return AppDispatcher.dispatchAsync(pagePromise, {
      request: WikiConstants.ActionTypes.REQUEST_PAGE,
      success: WikiConstants.ActionTypes.REQUEST_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.REQUEST_PAGE_FAILURE
    }, { pageName: pageName });
  }
};

module.exports = WikiPageActionCreators;