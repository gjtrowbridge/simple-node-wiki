var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

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

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.body);
});
