/**
  Displays sanitized raw HTML.
  
  Designed for use with the EditBox component.
*/
var React = require('react');

var DisplayBox = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  propTypes: {
    sanitizedHtml: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      sanitizedHtml: ""
    };
  },
  render: function() {
    return (
      <div className="display-box">
        {this.props.sanitizedHtml}
      </div>
    );
  }
});

module.exports = DisplayBox;