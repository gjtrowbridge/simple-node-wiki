var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var EditBox = require('../EditBox/EditBox.js');
var marked = require('marked');

var Page = React.createClass({
  displayName: 'Page',
  getInitialState: function() {
    return {
      title: '',
      text: ''
    }
  },
  handleBoxMainChange: function(e) {
    this.setState({
      text: e.target.value
    });
  },
  convertToMarkdown: function(text) {
    return marked(text, {sanitize: true});
  },
  render: function() {
    var children = [
      React.createElement(
        EditBox,
        {
          key: 1,
          editing: true,
          text: this.state.text,
          onBoxMainChange: this.handleBoxMainChange
        }
      ),
      React.createElement(
        DisplayBox,
        {
          key: 2,
          text: this.convertToMarkdown(this.state.text)
        }
      )
    ];
    return React.createElement('div', {
      className: 'page'
    }, children);
  }
});

module.exports = Page;
