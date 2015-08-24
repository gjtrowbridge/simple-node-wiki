var keyMirror = require('keymirror');

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  PageListTypes: keyMirror({
    BY_RECENTLY_MODIFIED: null,
    // BY_RECENTLY_VISITED: null,
    // BY_MOST_VISITED: null,
    BY_RECENTLY_CREATED: null
  }),
  ActionTypes: keyMirror({
    CHANGE_EVENT: null,

    REQUEST_PAGE: null,
    REQUEST_PAGE_SUCCESS: null,
    REQUEST_PAGE_FAILURE: null,

    SAVE_PAGE: null,
    SAVE_PAGE_SUCCESS: null,
    SAVE_PAGE_FAILURE: null,

    CREATE_PAGE: null,
    CREATE_PAGE_SUCCESS: null,
    CREATE_PAGE_FAILURE: null,

    SHOW_MODAL: null,
    HIDE_MODAL: null,

    SHOW_NOTIFICATION: null,
    HIDE_NOTIFICATION: null
  })
};
