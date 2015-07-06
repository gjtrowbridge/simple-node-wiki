var React = require('react');
var d = React.DOM;

var SearchResults = React.createClass({
  displayName: 'SearchResults',
  getDefaultProps: function() {
    pages: []
  },
  pagesToHTML: function() {
    return this.props.pages.map(function(page, index) {
      return d.li(
        {
          key: index
        }, d.a(
          {
            href: page.name
          },
          page.title
        )
      );
    });
  },
  render: function() {
    return d.div(
      {
        className: 'search-results ' +
            (this.props.pages.length > 0 ? '' : 'hidden')
      },
      d.ul(
        {},
        this.pagesToHTML()
      )
    );
  }
});

module.exports = SearchResults;
