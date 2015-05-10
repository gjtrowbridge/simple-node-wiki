var React = require('react');
var PageBox = require('../PageBox/PageBox.js');
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
        PageBox,
        {
          key: 1,
          editing: true,
          onBoxMainChange: this.handleBoxMainChange
        }
      ),
      React.createElement(
        PageBox,
        {
          key: 2,
          editing: true,
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
