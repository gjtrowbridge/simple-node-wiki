var React = require('react');

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    return React.createElement('div', {
      className: 'display-box'
    });
  }
});



module.exports = DisplayBox;
