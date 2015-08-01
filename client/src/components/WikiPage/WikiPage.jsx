/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');
var WikiPageStore = require('../../stores/WikiPageStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var WikiPage = React.createClass({
  getStateFromStores: function() {
    return WikiPageStore.get(this.props.pageName);
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  requestData: function(pageName) {
    WikiPageActionCreators.requestPage(pageName);
  },
  componentWillMount: function() {
    this.requestData(this.props.pageName);
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
    if (this.state.text) {
      innerElement = (<MarkdownEditor initialMarkdown={this.state.text} />);
    } else {
      innerElement = "";
    }
    return (
      <div className="wiki-page">
        <h3>{this.props.pageName}</h3>
        {innerElement}
      </div>
    );
  }
});

module.exports = WikiPage;
