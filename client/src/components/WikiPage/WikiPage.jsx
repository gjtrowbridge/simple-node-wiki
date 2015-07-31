/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');
var WikiPageStore = require('../../stores/WikiPageStore.js');

var WikiPage = React.createClass({
  getStateFromStores: function() {
    return WikiPageStore.get(this.props.pageName);
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  componentDidMount: function() {
    WikiPageStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    WikiPageStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  render: function() {
    return (
      <div className="wiki-page">
        <h3>{this.props.pageName}</h3>
        <MarkdownEditor initialMarkdown={this.state.text} />
      </div>
    );
  }
});

module.exports = WikiPage;