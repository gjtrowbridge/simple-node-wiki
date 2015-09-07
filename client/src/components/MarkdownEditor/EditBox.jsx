/**
  Provides a textarea for input.

  Designed for use with the DisplayBox component.
*/
var React = require('react');

var EditBox = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    markdownText: React.PropTypes.string.isRequired,
    hidden: React.PropTypes.bool.isRequired
  },
  render: function() {
    var classes = ['edit-box'];
    if (this.props.hidden) {
      classes.push('hidden');
    }
    return (
      <div className={classes.join(' ')}>
        <textarea onChange={this.props.onChange} value={this.props.markdownText}>
        </textarea>
      </div>
    );
  }
});

module.exports = EditBox;
