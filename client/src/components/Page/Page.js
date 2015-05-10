var React = require('react');
var PageBox = require('../PageBox/PageBox.js');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var EditBox = require('../EditBox/EditBox.js');

var Page = React.createClass({
  displayName: 'Page',
  handleChange: function(e) {
    console.log(e);
  },
  render: function() {
    var children = [
      React.createElement(
        PageBox,
        {
          key: 1,
          editing: true,
          onBoxMainChange: this.handleChange
        }
      ),
      React.createElement(
        PageBox,
        {
          key: 2,
          editing: true
        }
      )
    ];
    return React.createElement('div', {
      className: 'page'
    }, children);
  }
});

module.exports = Page;
