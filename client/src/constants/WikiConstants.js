var keyMirror = require('keymirror');

var WikiConstants = {
  BASE_URL: window.location.protocol + '//' + window.location.host,
  PageListTypes: keyMirror({
    BY_RECENTLY_MODIFIED: null,
    // BY_RECENTLY_VISITED: null,
    // BY_MOST_VISITED: null,
    BY_RECENTLY_CREATED: null
  }),
  ActionTypes: keyMirror({
    CLEAR_SEARCH: null,

    CHANGE_EVENT: null,

    REQUEST_USER: null,
    REQUEST_USER_SUCCESS: null,
    REQUEST_USER_FAILURE: null,

    LOGOUT_USER: null,

    REQUEST_PAGE: null,
    REQUEST_PAGE_SUCCESS: null,
    REQUEST_PAGE_FAILURE: null,

    REQUEST_PAGE_LIST: null,
    REQUEST_PAGE_LIST_SUCCESS: null,
    REQUEST_PAGE_LIST_FAILURE: null,

    SAVE_PAGE: null,
    SAVE_PAGE_SUCCESS: null,
    SAVE_PAGE_FAILURE: null,

    CREATE_PAGE: null,
    CREATE_PAGE_SUCCESS: null,
    CREATE_PAGE_FAILURE: null,

    DELETE_PAGE: null,
    DELETE_PAGE_SUCCESS: null,
    DELETE_PAGE_FAILURE: null,

    SHOW_MODAL: null,
    HIDE_MODAL: null,

    SHOW_NOTIFICATION: null,
    HIDE_NOTIFICATION: null,

    SET_VIEW_MODE: null,

    TOGGLE_SEARCH_RESULTS: null,

    PAGE_TRANSITION: null
  })
};

export default WikiConstants;
