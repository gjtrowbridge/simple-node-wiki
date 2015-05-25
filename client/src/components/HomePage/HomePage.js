/*
  This component is what the user should see
  when they first come to the Wiki.

  It (like most of these components)
  will likely need a major refactor/cleanup
  at some point, but this is "good enough" for
  an ugly (oh, so ugly) minimum viable product.
*/

var React = require('react');
var d = React.DOM;
var helpers = require('../../helpers.js');

// Components
var TitleBar = require('../TitleBar/TitleBar.js');
var NameBar = require('../NameBar/NameBar.js');

// Misc
var helpers = require('../../helpers.js');
var $ = require('jquery');

var HomePage = React.createClass({
  displayName: 'HomePage',
  createPage: function() {
    $.ajax({
      type: "POST",
      url: "/_api/pages",
      data: JSON.stringify({
        name: this.state.name,
        title: this.state.title,
        text: '#' + this.state.title
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    });
  },
  getInitialState: function() {
    return {
      title: '',
      name: '',
      text: ''
    };
  },
  handleTitleUpdate: function(e) {
    this.setState({
      title: e.target.value,
      name: helpers.convertStringToPath(e.target.value)
    });
  },
  render: function() {
    return d.div(
      {
        className: 'home-page'
      },
      d.h1(
        {},
        'Create a new page'
      ),
      d.p(
        {},
        'Please ignore the fact that this page is horrifyingly ugly.'
      ),
      d.p(
        {},
        'It may get vaguely prettier/more useful in the near future.'
      ),
      d.p(
        {},
        'In the meantime, you can add a new page to the wiki below.'
      ),
      React.createElement(
        TitleBar,
        {
          title: this.state.title,
          handleTitleUpdate: this.handleTitleUpdate,
          placeholder: 'Enter title here'
        }
      ),
      React.createElement(
        NameBar,
        {
          name: this.state.name,
          placeholder: 'The page url will appear here'
        }
      ),
      d.button(
        {
          onClick: this.createPage
        },
        'Create New Page'
      )
    );
  }
});

module.exports = HomePage;
