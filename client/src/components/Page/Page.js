var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var EditBox = require('../EditBox/EditBox.js');
var marked = require('marked');

// TODO: Look into Flux, add it in...I think Flux can
// handle API calls instead of jQuery (among many other
// more relevant things)
var $ = require('jquery');

var Page = React.createClass({
  displayName: 'Page',
  getInitialState: function() {
    return {
      title: '',
      text: '',
      name: ''
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
  componentDidMount: function() {
    var me = this;
    var path = me.props.basePath + me.props.pageName;
    $.get(path, function(response) {
      var page = response.data
      me.setState({
        text: page.text,
        title: page.title,
        name: page.name,
        id: page.id
      })
    });
  },
  savePage: function() {
    var me = this;
    $.ajax({
      url: me.props.basePath + me.state.id,
      type: 'PUT',
      success: function(response) {
        console.log(response);
      },
      data: {
        text: me.state.text,
        title: me.state.title,
        name: me.state.name
      }
    });
  },
  render: function() {
    var children = [
      React.createElement(
        EditBox,
        {
          key: 1,
          editing: true,
          text: this.state.text,
          onBoxMainChange: this.handleBoxMainChange,
          onButtonClick: this.savePage
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
