import React from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown.js';

class CodeMirrorExample extends React.Component {
  // https://github.com/codemirror/CodeMirror/issues/5484
  componentDidMount() {
    const myTextArea = document.getElementById("ta-cm");
    const myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
      value: '#hi greg',
      mode: 'markdown',
      lineNumbers: true,
    });
    myCodeMirror.setValue('# Hello, Greg!');
    myCodeMirror.on('change', (cm, change) => {
      console.log('xcxc value on change', cm.getValue());
    });
  }
  render() {
    return (
      <div>
        Code Mirror Example
        <textarea id="ta-cm" />
      </div>
    );
  }
}

export default CodeMirrorExample;
