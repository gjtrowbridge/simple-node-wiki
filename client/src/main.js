var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var App = require('./components/App/App.js');

var routes = React.createElement(Route, {
  name: 'app',
  handler: App,
  path: '*'
});

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(
    React.createElement(Handler),
    document.getElementById('mount_point')
  );
});
