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
    var initialMarkdown = this.props.initialMarkdown;
    return {
      markdown: initialMarkdown,
      sanitizedHtml: this.markdownToHtml(initialMarkdown)
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
    // This doesn't *quite* follow the flux pattern,
    // but it helps keep this component self-sufficient
    var markdown = e.target.value;
    this.setState({
      markdown: markdown,
      sanitizedHtml: this.markdownToHtml(markdown)
    });

    if (this.props.onAfterChange) {
      this.props.onAfterChange(e);
    }
  },
  render: function() {
    return (
      <div className="markdown-editor">
        <EditBox initialMarkdown={this.state.markdown} onInputChange={this.onInputChange} />
        <DisplayBox sanitizedHtml={this.state.sanitizedHtml} />
      </div>
    );
  }
});

module.exports = MarkdownEditor;
