var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var EditBox = require('../EditBox/EditBox.js');
var marked = require('marked');
var d = React.DOM;

// TODO: Look into Flux, add it in...I think Flux can
// handle API calls instead of jQuery (among many other
// things)
var $ = require('jquery');

var Page = React.createClass({
  displayName: 'Page',
  getPage: function() {
    var me = this;
    var url = me.props.apiUrl + me.props.pageName;
    $.get(url, function(response) {
      var page = response.data;
      me.setState({
        text: page.text,
        title: page.title,
        name: page.name,
        id: page.id,
        loading: false,
        editMode: true
      });
    });
  },
  savePage: function() {
    var me = this;
    var url = me.props.apiUrl + me.state.id;
    $.ajax({
      url: url,
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
  getInitialState: function() {
    return {
      loading: true
    }
  },
  componentDidMount: function() {
    this.getPage();
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
  render: function() {
    if (this.state.loading) {
      return React.createElement('div',
        {
          className: 'page'
        },
        d.img({
          className: 'vertical-center horizontal-center',
          src: '/_public/assets/images/ajax-loader.gif'
        })
      );
    } else {
      return React.createElement('div',
        {
          className: 'page'
        },
        React.createElement(
          EditBox,
          {
            text: this.state.text,
            handleTextUpdate: this.handleTextUpdate,
            handleToggleEditMode: this.handleToggleEditMode,
            editMode: this.state.editMode
          }
        ),
        React.createElement(
          DisplayBox,
          {
            innerHTML: this.state.text !== undefined ?
                marked(this.state.text) : ''
          }
        )
      );
    }
  }
});

module.exports = Page;
