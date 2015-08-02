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
  requestData: function(pageName) {
    WikiPageActionCreators.requestPage(pageName);
  },
  saveData: function() {
    var pageData = {
      id: this.state.id,
      name: this.state.name,
      text: this.state.text,
      title: this.state.title
    };
    WikiPageActionCreators.savePage(pageData);
  },
  componentWillMount: function() {
    var pageData = {
      name: this.props.pageName
    };
    this.requestData(pageData);
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
    var innerElement;
    console.log(this.state);
    if (this.state.text) {
      innerElement = <MarkdownEditor initialMarkdown={this.state.text} />;
    } else {
      innerElement = "";
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
