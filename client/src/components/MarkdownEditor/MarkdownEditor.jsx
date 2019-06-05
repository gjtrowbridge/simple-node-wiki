/**
  Provides an input "editor" for typing in markdown
  showing the resulting html.
*/
import React from 'react';
import Prism from 'prismjs';
const marked = require('marked');

import PropTypes from 'prop-types';
import EditBox from './EditBox.jsx';
import DisplayBox from './DisplayBox.jsx';
import { transitionTo } from 'Src/utils/HistoryContainer';

const defaultLanguage = 'javascript';

marked.setOptions({
  highlight: function(code, lang) {
    // If the language isn't found, default back to javascript
    if (Prism.languages[lang] === undefined) {
      lang = defaultLanguage;
    }
    return Prism.highlight(code, Prism.languages[lang], lang);
  }
});

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.markdownToHtml = this.markdownToHtml.bind(this);
    this.runAfterRender = this.runAfterRender.bind(this);
  }
  runAfterRender() {
    // Hacky logic to allow relative links to use faster, history-based routing
    // instead of forcing a refresh when local page links are clicked
    // If you are reading this and can think of a better way, let me know :)
    const linksInMarkdown = document.querySelectorAll('.markdown-editor a');
    linksInMarkdown.forEach((link) => {
      const href = link.getAttribute('href');
      // If the link is relative, use transitionTo instead of normal link behavior
      // (again, this is for performance reasons)
      if (/^\/pages\/.*$/.test(href)) {
        link.onclick = (e) => {
          transitionTo(href);
          e.preventDefault();
        }
      }
    });

    // Hacky logic necessary to get plugins working for PrismJS
    // Context: https://github.com/PrismJS/prism/issues/1487
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);


  }
  componentDidMount() {
    this.runAfterRender();
  }
  componentDidUpdate() {
    this.runAfterRender();
  }
  // This is used to take raw user-inputted markdown and convert it to HTML
  markdownToHtml(markdown) {
    let html = marked(markdown, {sanitize: true});

    // First give all code blocks the default language if a language class is missing
    html = html.replace(/<code>/g, `<code class="language-${defaultLanguage}">`);

    // Then give all pre blocks the same class as their code child block
    // (and add a line-numbers class to enable the line numbers prismjs plugin css)
    html = html.replace(/(<pre)(>\s*<code( class="[-\w]+)">)/g, (match, p1, p2, p3) => {
      return p1 + `${p3} line-numbers"` + p2;
    });
    return html;
  }
  render() {
    var editBoxExtraClasses = ['box-edit-mode'];
    var displayBoxExtraClasses = ['box-edit-mode'];
    if (this.props.viewMode) {
      editBoxExtraClasses = ['hidden'];
      displayBoxExtraClasses = ['display-box-view-mode'];
    }
    return (
      <div className="markdown-editor">
        <EditBox extraClasses={editBoxExtraClasses} markdownText={this.props.markdownText}
            onChange={this.props.onChange} statusText={this.props.statusText} />
        <DisplayBox extraClasses={displayBoxExtraClasses}
            sanitizedHtml={this.markdownToHtml(this.props.markdownText)} />
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  markdownText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  statusText: PropTypes.string,
  // If enabled, shows only the display box
  // Otherwise shows both the display and edit boxes
  viewMode: PropTypes.bool.isRequired,
};

export default MarkdownEditor;
