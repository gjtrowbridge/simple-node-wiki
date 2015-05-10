var React = require('react');
var d = React.DOM;

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    console.log('displaying box');
    var children = [
      React.createElement('div', {
        className: 'box-header',
        key: 1
      }, "Test"),
      d.div({
        className: 'box-main',
        dangerouslySetInnerHTML: {
          __html: this.props.text ? this.props.text : ''
        },
        key: 2
      })
    ];
    return React.createElement('div', {
      className: 'display-box col-1-2'
    }, children);
  }
});



module.exports = DisplayBox;
