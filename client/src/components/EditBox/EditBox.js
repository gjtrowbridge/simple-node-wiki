var React = require('react');

var EditBox = React.createClass({
  displayName: 'EditBox',
  render: function() {
    var children = [
      React.createElement('input'),
      React.createElement('textarea', {className: 'edit-field'})
    ];
    return React.createElement('div', {
      className: 'edit-box col-1-2'
    }, children);
  }
});



module.exports = EditBox;
