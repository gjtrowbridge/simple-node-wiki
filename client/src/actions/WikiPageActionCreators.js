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
      pageData: pageData
    };

    return AppDispatcher.dispatchAsync(savePromise, {
      request: WikiConstants.ActionTypes.SAVE_PAGE,
      success: WikiConstants.ActionTypes.SAVE_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.SAVE_PAGE_FAILURE
    }, action);
  },
  requestPage: function(pageData) {
    var url = baseUrl + '/pages/name/' + pageData.name;
    var pagePromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'GET', {});
    var action = {
      pageData: pageData
    };

    return AppDispatcher.dispatchAsync(pagePromise, {
      request: WikiConstants.ActionTypes.REQUEST_PAGE,
      success: WikiConstants.ActionTypes.REQUEST_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.REQUEST_PAGE_FAILURE
    }, action);
  }
};

module.exports = WikiPageActionCreators;