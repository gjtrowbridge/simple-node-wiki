/**
  Provides a textarea for input.

  Designed for use with the DisplayBox component.
*/
var React = require('react');
import PropTypes from 'prop-types';

class EditBox extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  onKeyDown(e) {
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
  }
  render() {
    var classes = ['box', 'edit-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    return (
      <div className={classes.join(' ')}>
      <span className="status-text">{this.props.statusText}</span>
        <textarea className="edit-box-input" onKeyDown={this.onKeyDown}
            onChange={this.props.onChange} value={this.props.markdownText}>
        </textarea>
      </div>
    );
  }
}

EditBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  markdownText: PropTypes.string.isRequired,
  extraClasses: PropTypes.array,
  statusText: PropTypes.string
};

export default EditBox;
