var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Nav = require('../Nav/Nav.jsx');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    return (
      <div className="app">
        <Nav />
        <RouteHandler {...params} />
      </div>
    );
  }
});

module.exports = App;
