/**
  Provides a textarea for input.

  Designed for use with the DisplayBox component.
*/
var React = require('react');

var EditBox = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    markdownText: React.PropTypes.string.isRequired,
    extraClasses: React.PropTypes.array
  },
  render: function() {
    var classes = ['box', 'edit-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    return (
      <div className={classes.join(' ')}>
        <textarea className="edit-box-input"
            onChange={this.props.onChange} value={this.props.markdownText}>
        </textarea>
      </div>
    );
  }
});

module.exports = EditBox;
