var React = require('react');
var d = React.DOM;

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
      value: e.target.value
    });
  },
  matchingPages: function() {
    var me = this;
    if (me.state.value === '') {
      return [];
    } else {
      return this.props.pages.filter(function(page) {
        return page.title.toLowerCase().indexOf(me.state.value) >= 0;
      }).slice(0, this.props.maxResults);
    }
  },
  renderSearchResults: function() {
    var searchResults = this.matchingPages().map(function(page) {
      return {
        title: page.title,
        url: page.name
      }
    });
    console.log(searchResults);
  },
  render: function() {
    var searchResults = this.renderSearchResults();
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
      )
    )
  }
});

module.exports = PageSearch;
