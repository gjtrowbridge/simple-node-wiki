/**
  Provides a textarea for input.

  Designed for use with the DisplayBox component.
*/
const React = require('react');
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown.js';

class EditBox extends React.Component {
  render() {
    const {
      markdownText,
      onChange,
    } = this.props;
    let classes = ['box', 'edit-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    return (
      <div className={classes.join(' ')}>
      <span className="status-text">{this.props.statusText}</span>
        <CodeMirror
          value={markdownText}
          onBeforeChange={(editor, data, value) => {
            onChange(value);
          }}
          options={{
            mode: 'markdown',
            lineNumbers: true,
            showCursorWhenSelecting: true,
            cursorBlinkRate: 530,
          }}

        />
        <textarea id="edit-box-text-area" className="edit-box-input">
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
