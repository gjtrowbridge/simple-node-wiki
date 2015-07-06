var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="app">
        <nav>Nav here</nav>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
