/**
  Displays sanitized raw HTML.
  
  Designed for use with the EditBox component.
*/
var React = require('react');

var DisplayBox = React.createClass({
  propTypes: {
    sanitizedHtml: React.PropTypes.string.isRequired,
    extraClasses: React.PropTypes.array
  },
  render: function() {
    var classes = ['box', 'display-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    var dangerousHtml = {
      __html: this.props.sanitizedHtml
    };
    return (
      <div className={classes.join(' ')}
          dangerouslySetInnerHTML={dangerousHtml} />
    );
  }
});

module.exports = DisplayBox;
