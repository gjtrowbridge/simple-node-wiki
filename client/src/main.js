var React = require('react');
var Router = require('react-router');

// Routing Components
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Custom Components
var Nav = require('./components/Nav/Nav.js');
var Page = require('./components/Page/Page.js');
var HomePage = require('./components/HomePage/HomePage.js')

// Create and render container app
var App = React.createClass({
  displayName: 'App',
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var pageName = this.context.router.getCurrentPath();
    if (pageName === '/') {
      return React.createElement(HomePage, {

      });
    } else {
      return React.createElement(Page, {
        apiUrlForPageName: '/_api/pages/name',
        apiUrl: '/_api/pages',
        pageName: pageName
      });
    }
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
