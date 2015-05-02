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
  mixins: [ Router.State ],
  render: function() {
    var children = [
      // React.createElement(Nav, {key: 1}),
      'YO! ',
      this.getPath(),
      React.createElement(RouteHandler, {key: 2})
    ];
    return React.createElement('div', null, children);
  }
});

var routes = React.createElement(Route, {
  name: 'app',
  handler: App,
  path: '*'
});

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
