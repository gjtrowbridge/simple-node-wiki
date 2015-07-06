var React = require('react');
var d = React.DOM;

var SearchResults = require('../SearchResults/SearchResults.js');

var PageSearch = React.createClass({
  displayName: 'PageSearch',
  getInitialState: function() {
    return {
      value: ''
    };
  },
  getDefaultProps: function() {
    return {
      pages: [{title: 'hello'}, {title: 'hel'}],
      maxResults: 5
    }
  },
  onChange: function(e) {
    this.setState({
      value: e.target.value.toLowerCase()
    });
  },
  matchingPages: function() {
    var me = this;
    if (me.state.value === '') {
      return [];
    } else {
      var matchingPages = this.props.pages.filter(function(page) {
        return page.title.toLowerCase().indexOf(me.state.value) >= 0;
      }).sort(function(a, b) {
        return a.title.length - b.title.length;
      });
      return matchingPages.slice(0, this.props.maxResults);
    }
  },
  render: function() {
    return d.div(
      {
        className: 'page-search horizontal-center',
      },
      d.input(      
        {
          type: 'search',
          className: 'horizontal-center',
          placeholder: 'Search Pages',
          onChange: this.onChange
        }
      ),
      React.createElement(
        SearchResults,
        {
          pages: this.matchingPages()
        }
      )
    )
  }
});

module.exports = PageSearch;
