/**
  Provides a textarea for input.

  Designed for use with the DisplayBox component.
*/
const React = require('react');
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';

class EditBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
    };
  }
  componentDidMount() {
    const {
      onChange,
      markdownText,
    } = this.props;
    const editBoxTextArea = document.getElementById('edit-box-text-area');
    const editor = CodeMirror.fromTextArea(editBoxTextArea, {
      lineNumbers: true,
      mode: 'markdown',
      lineWrapping: true,
    });
    editor.setValue(markdownText);
    editor.on('change', () => {
      onChange(editor.getValue());
    });
    this.setState({
      editor,
    });
  }
  componentDidUpdate() {
    const editor = this.state.editor;
    editor.setSize(null, '100%');
    if (editor) {
      editor.refresh();
    }
  }
  render() {
    let classes = ['box', 'edit-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    return (
      <div className={classes.join(' ')}>
      <span className="status-text">{this.props.statusText}</span>
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
