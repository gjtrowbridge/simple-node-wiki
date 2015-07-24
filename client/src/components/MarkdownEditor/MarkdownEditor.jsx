/**
  Provides an input "editor" for typing in markdown
  and will optionally show the resulting html in real
  time.
*/
var React = require('react');
var EditBox = require('../EditBox/EditBox.jsx');
var DisplayBox = require('../DisplayBox/DisplayBox.jsx');
var marked = require('marked');

var MarkdownEditor = React.createClass({
  propTypes: {
    initialMarkdown: React.PropTypes.string
  },
  getDefaultProps: function() {
    initialMarkdown: ''
  },
  getInitialState: function() {
    return {
      markdown: this.props.initialMarkdown,
      sanitizedHtml: ''
    }
  },
  // This is used to sanitize raw user-inputted
  // markdown and convert it to HTML
  markdownToHtml: function(markdown) {
    return marked(markdown, {sanitize: true});
  },
  // This will run whenever a user changes the text
  // in the EditBox
  onInputChange: function(e) {
    var markdown = e.target.value;
    this.setState({
      markdown: markdown,
      sanitizedHtml: this.markdownToHtml(markdown)
    })
  },
  render: function() {
    return (
      <div className="markdown-editor">
        <EditBox onInputChange={this.onInputChange} />
        <DisplayBox sanitizedHtml={this.state.sanitizedHtml} />
      </div>
    );
  }
});

module.exports = MarkdownEditor;
