var React = require('react');
var Router = require('react-router');

// Routing Components
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Custom Components
var Nav = require('./Nav/Nav.js');
var Page = require('./Page/Page.js');

// Create and render container app
var App = React.createClass({
  displayName: 'App',
  mixins: [ Router.State ],
  render: function() {
    var children = [
      React.createElement(Page, {key: 1}),
      // 'YO! ',
      // this.getPath(),
      // React.createElement(RouteHandler, {key: 2})
    ];
    return React.createElement(Page);
    // return React.createElement('div', null, children);
  }
});

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
