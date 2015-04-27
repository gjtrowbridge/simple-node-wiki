var React = require('react');
var Router = require('react-router');

// Routing Components
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Custom Components
var Nav = require('./nav/Nav.js');

// Create and render container app
var App = React.createClass({
  render: function() {
    var children = [
      React.createElement(Nav)
    ];
    return React.createElement('div', null, children);
  }
});

React.render(
  React.createElement(App),
  document.getElementById('mount_point')
);
