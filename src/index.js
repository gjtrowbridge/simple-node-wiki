var React = require('react');
var Router = require('react-router');

// Routing Components
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Custom Components
var Nav = require('./nav/Nav.js');
var Page = require('./page/Page.js');

// Create and render container app
var App = React.createClass({
  displayName: 'App',
  render: function() {
    var children = [
      React.createElement(Nav, {key: 1}),
      React.createElement(RouteHandler, {key: 2})
    ];
    return React.createElement('div', null, children);
  }
});

var routes = React.createElement(Route, {
      name: 'app',
      path: '/',
      handler: App
    }, React.createElement(Route, {
          name: 'page',
          path: '/page',
          handler: Page
        }));

// React.render(
//   React.createElement(App),
//   document.getElementById('mount_point')
// );

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(
    React.createElement(Handler),
    document.getElementById('mount_point')
  );
});
