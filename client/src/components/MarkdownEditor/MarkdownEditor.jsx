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
    markdownText: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  // This is used to sanitize raw user-inputted
  // markdown and convert it to HTML
  markdownToHtml: function(markdown) {
    return marked(markdown, {sanitize: true});
  },
  render: function() {
    return (
      <div className="markdown-editor">
        <EditBox markdownText={this.props.markdownText}
            onChange={this.props.onChange} />
        <DisplayBox sanitizedHtml={this.markdownToHtml(this.props.markdownText)} />
      </div>
    );
  }
});

module.exports = MarkdownEditor;
