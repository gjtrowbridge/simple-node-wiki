var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiUtils = require('../utils/WikiUtils.js');
var WikiConstants = require('../constants/WikiConstants.js');
var RouterContainer = require('../utils/RouterContainer.js');
var shared = require('../../../shared/shared.js');
var apiRootUrl = WikiConstants.BASE_URL + '/_api';

var WikiPageActionCreators = {
  savePage: function(pageData, optOnSuccess) {
    var url = apiRootUrl + '/pages/' + pageData.id;
    if (optOnSuccess === undefined) {
      optOnSuccess = function() {}
    }
    var headers = {};
    if (localStorage.jwt) {
      headers.jwt = jwt;
    }
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'PUT', headers, pageData),
      types: {
        request: WikiConstants.ActionTypes.SAVE_PAGE,
        success: WikiConstants.ActionTypes.SAVE_PAGE_SUCCESS,
        failure: WikiConstants.ActionTypes.SAVE_PAGE_FAILURE
      },
      action: {
        pageData: pageData,
        onSuccess: optOnSuccess
      }
    });
  },
  requestPage: function(pageData) {
    var url = apiRootUrl + '/pages/name/' + pageData.name;
    var headers = {};
    if (localStorage.jwt) {
      headers.jwt = jwt;
    }
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'GET', headers, {}),
      types: {
        request: WikiConstants.ActionTypes.REQUEST_PAGE,
        success: WikiConstants.ActionTypes.REQUEST_PAGE_SUCCESS,
        failure: WikiConstants.ActionTypes.REQUEST_PAGE_FAILURE
      },
      action: {
        pageData: pageData
      }
    });
  },
  createPage: shared.decorators.addDefaultParams({
    name: shared.decorators.IS_REQUIRED,
    title: shared.decorators.IS_REQUIRED,
    text: "",
    onSuccess: function() {}
  }, function(params) {
    var url = apiRootUrl + '/pages';
    var pageData = {
      name: params.name,
      title: params.title,
      text: params.text
    };
    var headers = {};
    if (localStorage.jwt) {
      headers.jwt = jwt;
    }
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'POST', headers, pageData),
      types: {
        request: WikiConstants.ActionTypes.CREATE_PAGE,
        success: WikiConstants.ActionTypes.CREATE_PAGE_SUCCESS,
        failure: WikiConstants.ActionTypes.CREATE_PAGE_FAILURE
      },
      action: {
        pageData: pageData,
        onSuccess: params.onSuccess
      }
    });
  }),
  requestPageList: shared.decorators.addDefaultParams({
    offset: 0,
    limit: 10,
    pageListType: shared.constants.IS_REQUIRED
  }, function(params) {
    var url = apiRootUrl + '/pages?limit='
        + params.limit + '&offset=' + params.offset
        + '&listType=' + params.pageListType;
    var headers = {};
    if (localStorage.jwt) {
      headers.jwt = jwt;
    }
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'GET', headers, {}),
      types: {
        request: WikiConstants.ActionTypes.REQUEST_PAGE_LIST,
        success: WikiConstants.ActionTypes.REQUEST_PAGE_LIST_SUCCESS,
        failure: WikiConstants.ActionTypes.REQUEST_PAGE_LIST_FAILURE
      },
      action: {
        pageListType: params.pageListType
      }
    });
  }),
  searchPages: shared.decorators.addDefaultParams({
    offset:0,
    limit: 10,
    searchTerm: shared.constants.IS_REQUIRED
  }, function(params) {
    if (params.searchTerm === '') {
      return AppDispatcher.dispatch(WikiConstants.ActionTypes.CLEAR_SEARCH, {});
    } else {
      var url = apiRootUrl + '/pages/search/' + params.searchTerm
          + "?limit=" + params.limit + '&offset=' + params.offset;
      var headers = {};
      if (localStorage.jwt) {
        headers.jwt = jwt;
      }
      return AppDispatcher.dispatchAsync({
        promise: WikiUtils.requestViaHttpAndReturnPromise(
            url, 'GET', headers, {}),
        types: {
          request: WikiConstants.ActionTypes.REQUEST_PAGE_LIST,
          success: WikiConstants.ActionTypes.REQUEST_PAGE_LIST_SUCCESS,
          failure: WikiConstants.ActionTypes.REQUEST_PAGE_LIST_FAILURE
        },
        action: {
          pageListType: shared.constants.SEARCH
        }
      });
    }
  }),
  deletePage: shared.decorators.addDefaultParams({
    pageId: shared.constants.IS_REQUIRED,
    pageTitle: shared.constants.IS_REQUIRED,
    onSuccess: function() {
      var router = RouterContainer.getRouter();
      router.transitionTo('home');
    }
  }, function(params) {
    var url = apiRootUrl + '/pages/' + params.pageId;
    var headers = {};
    if (localStorage.jwt) {
      headers.jwt = jwt;
    }
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'DELETE', headers, {}),
      types: {
        request: WikiConstants.ActionTypes.DELETE_PAGE,
        success: WikiConstants.ActionTypes.DELETE_PAGE_SUCCESS,
        failure: WikiConstants.ActionTypes.DELETE_PAGE_FAILURE
      },
      action: {
        pageId: params.pageId,
        pageTitle: params.pageTitle,
        onSuccess: params.onSuccess
      }
    });
  }),
  setViewMode: function(isEnabled) {
    return AppDispatcher.dispatch(WikiConstants.ActionTypes.SET_VIEW_MODE, {
      isEnabled: isEnabled
    });
  }
};

module.exports = WikiPageActionCreators;