var React = require('react');
var d = React.DOM;

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    return React.createElement('div', {
        className: 'box display-box'
      },
      d.div({
        className: 'inner-text-area',
        dangerouslySetInnerHTML: {
          __html: this.props.innerHTML ? this.props.innerHTML : ''
        },
        key: 2
      })
    );
  }
});



module.exports = DisplayBox;
