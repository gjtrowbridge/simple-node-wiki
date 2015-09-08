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
  onKeyDown: function(e) {
    // Override tab key to add spacing
    if (e.keyCode === 9) {
      e.preventDefault();
      var target = e.target;
      var start = target.selectionStart;
      var end = target.selectionEnd;
      var toInsert = '  ';

      target.value = target.value.substring(0, start) +
          toInsert + target.value.substring(end);
      target.selectionStart = start + toInsert.length;
      target.selectionEnd = start + toInsert.length;
    }
  },
  render: function() {
    var classes = ['box', 'edit-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    return (
      <div className={classes.join(' ')}>
        <textarea className="edit-box-input" onKeyDown={this.onKeyDown}
            onChange={this.props.onChange} value={this.props.markdownText}>
        </textarea>
      </div>
    );
  }
});

module.exports = EditBox;
