/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');
var WikiPageStore = require('../../stores/WikiPageStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var WikiPage = React.createClass({
  getStateFromStores: function() {
    return WikiPageStore.getByName(this.props.pageName);
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  requestPage: function(pageName) {
    WikiPageActionCreators.requestPage(pageName);
  },
  savePage: function(pageData) {
    WikiPageActionCreators.savePage(pageData);
  },
  componentWillMount: function() {
    var pageData = {
      name: this.props.pageName
    };
    this.requestPage(pageData);
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
  onEditorChange: function(e) {
    var pageData = {
      id: this.state.id,
      name: this.state.name,
      text: e.target.value,
      title: this.state.title
    };
    this.savePage(pageData);
  },
  render: function() {
    var innerElement;
    if (this.state.text) {
      innerElement = (
        <MarkdownEditor markdownText={this.state.text} onChange={this.onEditorChange} />
      );
    } else {
      innerElement = "Loading...";
    }
    return (
      <div className="wiki-page">
        <h3>{this.props.pageName}</h3>
        {this.state.status}
        {innerElement}
      </div>
    );
  }
});

module.exports = WikiPage;
