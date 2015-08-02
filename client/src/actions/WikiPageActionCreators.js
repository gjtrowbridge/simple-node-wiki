var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiUtils = require('../utils/WikiUtils.js');
var WikiConstants = require('../constants/WikiConstants.js');

var baseUrl = "http://localhost:8080/_api";

var WikiPageActionCreators = {
  savePage: function(pageData) {
    var url = baseUrl + '/pages/' + pageData.id;
    var savePromise = WikiUtils.requestViaHttpAndReturnPromise(
      url, 'PUT', pageData);
    var action = {
      data: pageData
    };

    return AppDispatcher.dispatchAsync(savePromise, {
      request: WikiConstants.ActionTypes.WikiPage.SAVE_PAGE,
      success: WikiConstants.ActionTypes.WikiPage.SAVE_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.WikiPage.SAVE_PAGE_FAILURE
    }, action);
  },
  requestPage: function(pageData) {
    var url = baseUrl + '/pages/name/' + pageData.name;
    var pagePromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'GET', {});
    var action = {
      data: pageData
    };

    return AppDispatcher.dispatchAsync(pagePromise, {
      request: WikiConstants.ActionTypes.WikiPage.REQUEST_PAGE,
      success: WikiConstants.ActionTypes.WikiPage.REQUEST_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.WikiPage.REQUEST_PAGE_FAILURE
    }, action);
  }
};

module.exports = WikiPageActionCreators;