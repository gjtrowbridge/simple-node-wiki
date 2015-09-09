/*
  A hacky way to store react router's router object
  for use in action creators without causing a circular
  dependency.

  Had to do it this way because passing router from
  WikiPageUrlTitleForm that is the inner node of a Modal
  seems to not get the router context from React Router.

  It seems that this will no longer be necessary
  in React v0.14 (when it comes out), since I think
  context is updated in 0.14 to work with my current
  setup for Modals...but I could be wrong.

  For "context" on context (ba dum chhhh):
  https://github.com/facebook/react/issues/3451

  It seemed easier to just use this approach rather
  than trying to debug context.
*/

var _router = null;

RouterContainer = {
  setRouter: function(router) {
    _router = router;
  },
  getRouter: function() {
    return _router;
  }
};

module.exports = RouterContainer;
