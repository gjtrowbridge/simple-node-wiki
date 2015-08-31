/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');
var WikiPageStore = require('../../stores/WikiPageStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var WikiPage = React.createClass({
  propTypes: function() {
    pageName: React.PropTypes.string.isRequired
  },
  getStateFromStores: function(overridePageName) {
    var pageName = overridePageName !== undefined ?
        overridePageName : this.props.pageName;
    return WikiPageStore.getByName(pageName);
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
  componentWillReceiveProps: function(newProps) {
    // This is probably the wrong solution long-term,
    // but for the time being this fixes the issue
    // of the page not resetting state when the page name
    // changes (as happens with back/forward navigation)
    // It may be better to solve this with key props
    // in a wrapper component...?
    if (newProps.pageName !== this.state.name &&
        newProps.pageName !== undefined) {
      this.setState(this.getStateFromStores(newProps.pageName));
    }
  },
  componentWillMount: function() {
    this.requestPage({ name: this.props.pageName });
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
    if (this.state.title !== undefined) {
      document.title = this.state.title;
    }
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
