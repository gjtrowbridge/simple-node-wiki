/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
var MarkdownEditor = require('../MarkdownEditor/MarkdownEditor.jsx');
var WikiPageStore = require('../../stores/WikiPageStore.js');

var getStateFromStores = function() {
  return WikiPageStore.get(this.props.url);
};

var WikiPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return getStateFromStores();
  },
  componentDidMount: function() {
    WikiPageStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    WikiPageStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getStateFromStores);
  },
  render: function() {
    return (
      <div className="wiki-page">
        <h3>{this.props.url}</h3>
        <MarkdownEditor />
      </div>
    );
  }
});

module.exports = WikiPage;