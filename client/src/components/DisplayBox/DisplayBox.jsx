/**
  Displays sanitized raw HTML.
  
  Designed for use with the EditBox component.
*/
var React = require('react');

var DisplayBox = React.createClass({
  propTypes: {
    sanitizedHtml: React.PropTypes.string.isRequired
  },
  render: function() {
    var dangerousHtml = {
      __html: this.props.sanitizedHtml
    };
    return (
      <div className="display-box"
          dangerouslySetInnerHTML={dangerousHtml} />
    );
  }
});

module.exports = DisplayBox;
