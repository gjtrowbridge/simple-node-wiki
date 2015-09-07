/**
  Provides an input "editor" for typing in markdown
  showing the resulting html.
*/
var React = require('react');
var EditBox = require('./EditBox.jsx');
var DisplayBox = require('./DisplayBox.jsx');
var marked = require('marked');

var MarkdownEditor = React.createClass({
  propTypes: {
    markdownText: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    // If enabled, shows only the display box
    // Otherwise shows both the display and edit boxes
    viewMode: React.PropTypes.bool.isRequired
  },
  // This is used to sanitize raw user-inputted
  // markdown and convert it to HTML
  markdownToHtml: function(markdown) {
    return marked(markdown, {sanitize: true});
  },
  render: function() {
    return (
      <div className="markdown-editor">
        <EditBox hidden={this.props.viewMode} markdownText={this.props.markdownText}
            onChange={this.props.onChange} />
        <DisplayBox sanitizedHtml={this.markdownToHtml(this.props.markdownText)} />
      </div>
    );
  }
});

module.exports = MarkdownEditor;
