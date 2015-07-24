/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');

var WikiPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      pageName: this.context.router.getCurrentParams().page_name
    };
  },
  render: function() {
    return (
      <div className="wiki-page">
        <h3>{this.state.pageName}</h3>
        <MarkdownEditor />
      </div>
    );
  }
});

module.exports = WikiPage;