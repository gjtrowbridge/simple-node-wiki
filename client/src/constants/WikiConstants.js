var keyMirror = require('keymirror');

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  ActionTypes: keyMirror({
    CHANGE_EVENT: null,

    REQUEST_PAGE: null,
    REQUEST_PAGE_SUCCESS: null,
    REQUEST_PAGE_FAILURE: null,

    SAVE_PAGE: null,
    SAVE_PAGE_SUCCESS: null,
    SAVE_PAGE_FAILURE: null,
  })
};
