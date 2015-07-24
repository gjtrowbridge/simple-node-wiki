/*
  This is the main component of each wiki page, and holds
  the display view, the edit view, and the title and
  name information for the page.
*/

// React
var React = require('react');
var d = React.DOM;

// Components
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var EditBox = require('../EditBox/EditBox.js');
var TitleBar = require('../TitleBar/TitleBar.js');
var NameBar = require('../NameBar/NameBar.js');

// Misc
var marked = require('marked');
var helpers = require('../../helpers.js');
var hljs = require('highlight.js');

// Set up code highlighting
marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

// jQuery is just a fast/easy way to make API requests
// May want to switch this out later, but it's OK for now.
var $ = require('jquery');

//
var Page = React.createClass({
  displayName: 'Page',
  getPage: function() {
    var me = this;
    var url = me.props.apiUrlForPageName + me.props.pageName;
    $.get(url, function(response) {
      var page = response.data;
      me.setState({
        text: page.text,
        title: page.title,
        name: page.name,
        id: page.id,
        loading: false,
        editMode: false
      });
    });
  },
  savePage: function() {
    var me = this;
    var url = me.props.apiUrl + '/' + me.state.id;

    $.ajax({
      type: 'PUT',
      url: url,
      data: JSON.stringify({
        text: me.state.text,
        title: me.state.title,
        name: me.state.name
      }),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(response) {
        console.log(response);
      }
    });
  },
  getInitialState: function() {
    return {
      loading: true
    }
  },
  componentDidMount: function() {
    this.getPage();
  },
  componentDidUpdate: function() {
    this.savePage();
  },
  handleTextUpdate: function(e) {
    this.setState({
      text: e.target.value
    });
  },
  handleToggleEditMode: function() {
    this.setState(function(previousState) {
      return {
        editMode: !previousState.editMode
      }
    });
    console.log('clicked');
  },
  convertToMarkdown: function(text) {
    return marked(text, {sanitize: true});
  },
  convertTitleToPath: function(title) {
    return helpers.convertStringToPath(title);
  },
  render: function() {
    console.log(this.state);
    if (this.state.loading) {
      return d.div(
        {
          className: 'page'
        },
        d.img({
          className: 'vertical-center horizontal-center',
          src: '/_public/assets/images/ajax-loader.gif'
        })
      );
    } else {
      return d.div(
        {
          className: 'page'
        },
        React.createElement(
          TitleBar,
          {
            title: this.state.title
          }
        ),
        React.createElement(
          EditBox,
          {
            name: this.state.name,
            text: this.state.text,
            title: this.state.title,
            handleTextUpdate: this.handleTextUpdate,
            handleToggleEditMode: this.handleToggleEditMode,
            editMode: this.state.editMode
          }
        ),
        React.createElement(
          DisplayBox,
          {
            innerHTML: this.state.text !== undefined ?
                this.convertToMarkdown(this.state.text) : '',
            editMode: this.state.editMode
          }
        ),
        React.createElement(
          NameBar,
          {
            name: this.state.name
          }
        )
      );
    }
  }
});
module.exports = Page;