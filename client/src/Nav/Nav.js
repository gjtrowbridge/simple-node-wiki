var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Nav = React.createClass({
  displayName: 'Nav',
  render: function() {
    var links = [
      React.createElement(Link, { to: 'app', key: 1 }, 'App'),
      React.createElement(Link, { to: 'page', key: 2 }, 'Page')
    ];
    return React.createElement('nav', null, links);
  }
});

module.exports = Nav;
