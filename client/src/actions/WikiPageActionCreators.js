var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var WikiUtils = require('../utils/WikiUtils.js');
var WikiConstants = require('../constants/WikiConstants.js');
var shared = require('../../../shared/shared.js');

var apiRootUrl = WikiConstants.BASE_URL + "/_api";

var WikiPageActionCreators = {
  savePage: function(pageData) {
    var url = apiRootUrl + '/pages/' + pageData.id;

    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'PUT', pageData),
      types: {
        request: WikiConstants.ActionTypes.SAVE_PAGE,
        success: WikiConstants.ActionTypes.SAVE_PAGE_SUCCESS,
        failure: WikiConstants.ActionTypes.SAVE_PAGE_FAILURE
      },
      action: {
        pageData: pageData
      }
    });
  },
  requestPage: function(pageData) {
    var url = apiRootUrl + '/pages/name/' + pageData.name;
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'GET', {}),
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
    text: ""
  }, function(params) {
    var url = apiRootUrl + '/pages';
    var pageData = {
      name: params.name,
      title: params.title,
      text: params.text
    };
    return AppDispatcher.dispatchAsync({
      promise: WikiUtils.requestViaHttpAndReturnPromise(
          url, 'POST', pageData),
      types: {
        request: WikiConstants.ActionTypes.CREATE_PAGE,
        success: WikiConstants.ActionTypes.CREATE_PAGE_SUCCESS,
        failure: WikiConstants.ActionTypes.CREATE_PAGE_FAILURE
      },
      action: {
        pageData: pageData
      }
    });
  }),
  requestPageList: shared.decorators.addDefaultParams({
    offset: 0,
    limit: 10,
    orderBy: shared.constants.IS_REQUIRED
  }, function(params) {
    var url = apiRootUrl + '/pages?limit='
        + params.limit + '&offset=' + params.offset;
    var pagePromise = WikiUtils.requestViaHttpAndReturnPromise(
        url, 'GET', {});
    return AppDispatcher.dispatchAsync({
      promise: createPagePromise,
      types: types,
      action: {}
    });
  })
};

module.exports = WikiPageActionCreators;