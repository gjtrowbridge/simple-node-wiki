var React = require('react');
var d = React.DOM;

var PageSearch = require('../PageSearch/PageSearch.js');

var $ = require('jquery');

var Nav = React.createClass({
  displayName: 'Nav',
  getInitialState: function() {
    return {
      pages: []
    };
  },
  getPages: function() {
    var me = this;
    var url = me.props.apiUrl;
    $.get(url, function(response) {
      var pages = response.data;
      me.setState({
        pages: pages
      });
    });
  },
  componentDidMount: function() {
    this.getPages();
  },
  render: function() {
    return d.nav(      
      {
        className: 'nav'
      },
      React.createElement(PageSearch, {
        pages: this.state.pages
      })
    );
  }
});

module.exports = Nav;
