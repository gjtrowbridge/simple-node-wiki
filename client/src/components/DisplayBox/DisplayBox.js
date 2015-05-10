var React = require('react');

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    var children = [
      React.createElement('h1', {className: 'box-header', key: 1}, "Test"),
      React.createElement('textarea', {className: 'box-main', key: 2})
    ];
    return React.createElement('div', {
      className: 'display-box col-1-2'
    }, children);
  }
});



module.exports = DisplayBox;
