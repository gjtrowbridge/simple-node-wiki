var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var EditBox = require('../EditBox/EditBox.js');

var Page = React.createClass({
  displayName: 'Page',
  render: function() {
    var children = [
      React.createElement(DisplayBox, {key: 1}),
      React.createElement(EditBox, {key: 2})
    ];
    return React.createElement('div', {
      className: 'page'
    }, children);
  }
});

module.exports = Page;
