var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiUtils = require('../utils/WikiUtils.js');
var WikiConstants = require('../constants/WikiConstants.js');
var shared = require('../../../shared/shared.js');

var apiRootUrl = WikiConstants.BASE_URL + "/_api";

var WikiPageActionCreators = {
  savePage: function(pageData) {
    var url = apiRootUrl + '/pages/' + pageData.id;
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
    var url = apiRootUrl + '/pages/name/' + pageData.name;
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
  },
  createPage: function(pageData) {
    var url = apiRootUrl + '/pages/';
    if (pageData.text === undefined) {
      pageData.text = "";
    }
    var createPromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'POST', pageData);
    var action = {
      pageData: pageData
    };

    return AppDispatcher.dispatchAsync(createPromise, {
      request: WikiConstants.ActionTypes.CREATE_PAGE,
      success: WikiConstants.ActionTypes.CREATE_PAGE_SUCCESS,
      failure: WikiConstants.ActionTypes.CREATE_PAGE_FAILURE
    }, action);
  },
  requestPages: shared.decorators.addDefaultParams({
    offset: 0,
    limit: 10,
    orderBy: shared.constants.IS_REQUIRED
  }, function(params) {
    var url = apiRootUrl + '/pages?limit='
        + params.limit + '&offset=' + params.offset;
    var pagePromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'GET', {});
    var action = {};
    return AppDispatcher.dispatchAsync(pagePromise, {
      request: WikiConstants.ActionTypes.REQUEST_PAGE_LIST,
      success: WikiConstants.ActionTypes.REQUEST_PAGE_LIST_SUCCESS,
      failure: WikiConstants.ActionTypes.REQUEST_PAGE_LIST_FAILURE
    }, action);
  })
};

module.exports = WikiPageActionCreators;