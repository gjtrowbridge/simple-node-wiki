var React = require('react');
var d = React.DOM;

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    var classes = ['box', 'display-box'];
    if (!this.props.editMode) {
      classes.push('display-box-expanded');
    }
    return React.createElement('div', {
        className: classes.join(' ')
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
