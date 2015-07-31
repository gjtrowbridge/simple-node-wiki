/**
  Provides a textarea for input, optionally
  runs a handler on all inputed data on change.

  Designed for use with the DisplayBox component.
*/
var React = require('react');

var EditBox = React.createClass({
  PropTypes: {
    onInputChange: React.PropTypes.func,
    text: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      onInputChange: function() {},
      text: ''
    }
  },
  render: function() {
    return (
      <div className="edit-box">
        <textarea onChange={this.props.onInputChange} value={this.props.initialMarkdown}>
        </textarea>
      </div>
    );
  }
});

module.exports = EditBox;
