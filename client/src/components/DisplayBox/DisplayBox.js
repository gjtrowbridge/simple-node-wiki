var React = require('react');
var d = React.DOM;

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    return React.createElement('div', {
        className: 'display-box'
      },
      d.div({
        className: '',
        dangerouslySetInnerHTML: {
          __html: this.props.innerHTML ? this.props.innerHTML : ''
        },
        key: 2
      })
    );
  }
});



module.exports = DisplayBox;
