var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var AppStateActionCreators = require('./actions/AppStateActionCreators.js');
var RouterContainer = require('./utils/RouterContainer.js');

var App = require('./components/App/App.jsx');
var HomePage = require('./components/HomePage/HomePage.jsx');
var WikiPage = require('./components/WikiPage/WikiPage.jsx');

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={HomePage} />
    <Route name="pages" path="pages/:pageName" handler={WikiPage} />
    <NotFoundRoute handler={HomePage}/>
  </Route>
);

var router = Router.run(
      routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler />, document.body);
  setTimeout(function() {
    AppStateActionCreators.pageTransition(state.params);
  }, 0);
});

RouterContainer.setRouter(router);
