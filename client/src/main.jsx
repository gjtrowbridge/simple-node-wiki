var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/App/App.jsx');
var HomePage = require('./components/HomePage/HomePage.jsx');
var WikiPage = require('./components/WikiPage/WikiPage.jsx');

var routes = (
  <Route handler={App}>
    <Route path="home" handler={HomePage} />
    <Route path="pages/:page_name" handler={WikiPage} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.body);
});
