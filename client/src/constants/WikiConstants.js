var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: {
    Misc: keyMirror({
      CHANGE_EVENT: null
    }),
    WikiPage: keyMirror({
      REQUEST_PAGE: null,
      REQUEST_PAGE_SUCCESS: null,
      REQUEST_PAGE_FAILURE: null,

      SAVE_PAGE: null,
      SAVE_PAGE_SUCCESS: null,
      SAVE_PAGE_FAILURE: null,
    })
  }
};
