var React = require('react');
var d = React.DOM;

var PageSearch = require('../PageSearch/PageSearch.js');

var Nav = React.createClass({
  displayName: 'Nav',
  render: function() {
    return d.nav(      
      {
        className: 'nav'
      },
      React.createElement(PageSearch)
    );
  }
});

module.exports = Nav;
