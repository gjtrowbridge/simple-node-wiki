/**
  Provides a textarea for input, optionally
  runs a handler on all inputed data on change.

  Designed for use with the DisplayBox component.
*/
var React = require('react');

var EditBox = React.createClass({
  PropTypes: {
    onChange: React.PropTypes.func.isRequired,
    markdownText: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="edit-box">
        <textarea onChange={this.props.onChange} value={this.props.markdownText}>
        </textarea>
      </div>
    );
  }
});

module.exports = EditBox;
