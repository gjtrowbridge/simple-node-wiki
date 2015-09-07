/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');
var OnOffSwitch = require('../OnOffSwitch/OnOffSwitch.jsx');
var WikiPageStore = require('../../stores/WikiPageStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');
var WikiPageUrlTitleForm = require('../WikiPage/WikiPageUrlTitleForm.jsx');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');



var WikiPage = React.createClass({
  propTypes: function() {
    pageName: React.PropTypes.string.isRequired
  },
  getStateFromStores: function(overridePageName) {
    var pageName = overridePageName !== undefined ?
        overridePageName : this.props.pageName;
    var stateFromStores = WikiPageStore.getByName(pageName);
    return stateFromStores === null ? {} : stateFromStores;
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
    var cachedPageData = this.getStateFromStores();
    if (cachedPageData.hasOwnProperty('text')) {
      this.setState(cachedPageData);
    } else {
      this.requestPage({ name: this.props.pageName });
    }
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
  showEditPageModal: function() {
    var innerNode = (
      <WikiPageUrlTitleForm wikiPageTitle={this.state.title} wikiPageUrl={this.state.name}
        wikiPageId={this.state.id} wikiPageText={this.state.text} />
    );
    AppStateActionCreators.showModal(innerNode);
  },
  deletePage: function() {
    WikiPageActionCreators.deletePage(this.state.id);
  },
  render: function() {
    if (this.state.title !== undefined) {
      document.title = this.state.title;
    }
    var editor;
    var editButton;
    var deleteButton;
    var viewModeToggle;
    if (this.state.text !== undefined) {
      editor = (
        <MarkdownEditor markdownText={this.state.text}
            onChange={this.onEditorChange} viewMode={false} />
      );
      editButton = <button onClick={this.showEditPageModal}>Edit Name & Title</button>;
      deleteButton = <button onClick={this.deletePage}>Delete Page</button>;
      viewModeToggle = <OnOffSwitch onText="EDIT" offText="VIEW" />;
    } else {
      editor = "Loading...";
      editButton = "";
      deleteButton = "";
      viewModeToggle = "";
    }
    return (
      <div className="wiki-page">
        <h3>{this.props.pageName}</h3>
        {this.state.status}
        {viewModeToggle}
        {editor}
        {editButton}
        {deleteButton}
      </div>
    );
  }
});

module.exports = WikiPage;
