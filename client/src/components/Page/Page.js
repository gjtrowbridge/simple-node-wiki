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
      text: marked(e.target.value, {sanitize: true})
    });
  },
  render: function() {
    var children = [
      React.createElement(
        EditBox,
        {
          key: 1,
          editing: true,
          onBoxMainChange: this.handleBoxMainChange
        }
      ),
      React.createElement(
        DisplayBox,
        {
          key: 2,
          text: this.state.text
        }
      )
    ];
    return React.createElement('div', {
      className: 'page'
    }, children);
  }
});

module.exports = Page;
